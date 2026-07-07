import { stagger, useAnimate, useInView, motion } from "framer-motion";
import { useEffect } from "react";
import scrollToSection from "../utils/scrollToSection";

type Props = {};

export default function Footer({}: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        await animate(
          "img, button,a, span, p",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.1) },
        );
      }
    };
    aimation();
  }, [isInView]);
  return (
    <footer ref={scope} className="section bg-background">
      <div className="flex flex-wrap gap-8 items-center justify-between">
        <div className="space-y-8">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            src="logos/Kronix.svg"
            alt=""
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            className="max-w-85 font-thin text-body"
          >
            Kornix - the leading digital agency based in the UK, working with
            top-tier clients, from start-ups to enterprises.
          </motion.p>
        </div>
        <div className="flex flex-col gap-4">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            href="mailto:info@kronix.com"
            className="flex gap-4"
          >
            <img src="icons/mail.svg" alt="Mail" />
            info@kronix.com
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            href="tel:+112313435"
            className="flex gap-4"
          >
            <img src="icons/phone.svg" alt="Phone" />
            (001)1231 3435
          </motion.a>
          <div className="flex gap-5 items-center">
            <motion.a
              className="size-6"
              initial={{ opacity: 0, y: 20 }}
              href="https://facebook.com"
            >
              <img src="src/assets/logos/facebook.svg" alt="Facebook" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              href="https://instagram.com"
            >
              <img src="src/assets/logos/instagram.svg" alt="Instagram" />
            </motion.a>
            <motion.a initial={{ opacity: 0, y: 20 }} href="https://indeed.com">
              <img src="src/assets/logos/indeed.svg" alt="indeed" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              href="https://dribbble.com"
            >
              <img src="src/assets/logos/dribble.svg" alt="dribble" />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-white/15 mt-20 mb-8 " />
      <div className="flex flex-wrap gap-6 items-center justify-between">
        <div className="flex gap-4">
          {["Pricing", "Process", "Services", "Portfolio", "FAQ"].map(
            (item, index) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                className="text-white cursor-pointer hover:text-current/70 transition-colors duration-150"
                key={index}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </motion.button>
            ),
          )}
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }}>
          © 2024 Kronix. All rights reserved. This site is a test
        </motion.p>
      </div>
    </footer>
  );
}
