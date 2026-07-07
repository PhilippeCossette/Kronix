import {
  useAnimate,
  useMotionValueEvent,
  useScroll,
  motion,
  stagger,
} from "framer-motion";
import Button from "./Button";
import { useEffect, useState } from "react";
import HamburgerButton from "./HamburgerButton";
import scrollToSection from "../utils/scrollToSection";
import KronixLogo from "@/assets/logos/Kronix.svg";
type Props = {};

export default function Navigation({}: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { scrollY } = useScroll();
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTop(latest === 0);
  });

  return (
    <nav
      className={` ${isTop ? "bg-transparent" : "bg-background"} z-40 fixed top-0 left-0 w-full transition-colors duration-300`}
    >
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
    </nav>
  );
}

function DesktopNavigation() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const aimation = async () => {
      await animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.8, ease: "easeOut" },
      );
      await animate(
        "img",
        { opacity: 1, y: 0 },
        { duration: 0.8, ease: "easeOut" },
      );
      await animate(
        ".button",
        { opacity: 1, y: 0 },
        { duration: 0.8, ease: "easeOut" },
      );
      animate(
        ".links",
        { opacity: 1, y: 0 },
        { duration: 0.8, ease: "easeOut", delay: stagger(0.1) },
      );
    };
    aimation();
  }, []);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0, y: "-100%" }}
      className="desktop-nav max-w-360 mx-auto px-8 py-4 flex items-center justify-between"
    >
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        src={KronixLogo}
        alt="Kronix logo"
      />
      <div className="flex items-center gap-8">
        <div className="space-x-4">
          {["Process", "Services", "Portfolio", "FAQ"].map((item) => (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="links text-white hover:text-current/70 transition-colors duration-150"
            >
              {item}
            </motion.button>
          ))}
        </div>
        <Button
          initial={{ opacity: 0, y: 20 }}
          title="Get Started"
          variant="primary"
          onClick={() => scrollToSection("pricing")}
        />
      </div>
    </motion.div>
  );
}

function MobileNavigation() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const aimation = async () => {
      await animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.8, ease: "easeOut" },
      );
      animate(
        ".burger-button, img",
        { opacity: 1, x: 0 },
        { type: "spring", stiffness: 300, damping: 20, delay: 0.1 },
      );
    };
    aimation();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div
        ref={scope}
        initial={{ opacity: 0, y: "-100%" }}
        className="relative max-w-360 mx-auto px-8 py-4 flex items-center justify-between z-50"
      >
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          src="logos/Kronix.svg"
          alt=""
        />
        <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </motion.div>
      <MobileMenu close={() => setIsOpen(false)} isOpen={isOpen} />
    </>
  );
}

function MobileMenu({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const runAnimation = async () => {
      if (isOpen) {
        animate(scope.current, { y: 0 }, { duration: 0.6, ease: "easeInOut" });
        await animate(
          ".second-drawer",
          { y: 0 },
          { duration: 0.7, ease: "easeInOut", delay: 0.1 },
        );
        await animate(
          ".mobile-links",
          { y: 0, opacity: 1 },
          { duration: 0.6, ease: "easeInOut", delay: stagger(0.1) },
        );
      } else {
        await animate(
          ".mobile-links",
          { y: 10, opacity: 0 },
          {
            duration: 0.6,
            ease: "easeInOut",
            delay: stagger(0.1, { from: "last" }),
          },
        );
        animate(
          ".second-drawer",
          { y: "-100%" },
          { duration: 0.7, ease: "easeInOut" },
        );
        animate(
          scope.current,
          { y: "-100%" },
          { duration: 0.6, ease: "easeInOut", delay: 0.1 },
        );
      }
    };
    runAnimation();
  }, [isOpen]);
  return (
    <motion.div
      ref={scope}
      style={{ y: "-100%" } as React.CSSProperties}
      className="absolute inset-0 w-full h-dvh bg-primary"
    >
      <motion.div
        style={{ y: "-100%" } as React.CSSProperties}
        className="second-drawer w-full h-dvh bg-background flex flex-col items-center justify-center gap-8"
      >
        {["Pricing", "Process", "Services", "Portfolio", "FAQ"].map(
          (item, index) => (
            <motion.button
              style={{ opacity: 0, y: 10 }}
              key={item}
              className={`${index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"} mobile-links hover:-translate-y-0.5 active:text-primary/60 active:rotate-0 active:translate-0 text-h1 uppercase font-bold hover:text-primary transition-all duration-150`}
              onClick={() => {
                close();
                scrollToSection(item.toLowerCase());
              }}
            >
              {item}
            </motion.button>
          ),
        )}
      </motion.div>
    </motion.div>
  );
}
