import { useEffect } from "react";
import { motion, stagger } from "framer-motion";
import Button from "./Button";
import FluxaLogo from "@/logos/fluxa-logo.svg?react";
import LumixLogo from "@/logos/lumix-logo.svg?react";
import NexaLogo from "@/logos/nexa-logo.svg?react";
import OrbixLogo from "@/logos/orbix-logo.svg?react";
import VeloraLogo from "@/logos/velora-logo.svg?react";
import { useAnimate, useInView } from "framer-motion";
import alertUser from "../utils/alertUser";

export default function Hero() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        await animate(
          "h1",
          { opacity: 1, y: 0 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          "p, .buttonDiv",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );

        await animate(
          ".star",
          { opacity: 1, scale: 1 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );

        animate(
          ".spotlight",
          { opacity: 1, scale: 1 },
          { duration: 0.8, ease: "easeOut" },
        );

        animate(
          ".brandDiv",
          { opacity: 1, y: 0 },
          { duration: 0.4, ease: "easeOut" },
        );

        animate(
          ".logo",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
      } else {
        animate(
          "h1",
          { opacity: 0, y: 20 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          "p, .buttonDiv",
          { opacity: 0, y: 20 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".star",
          { opacity: 0, scale: 0.5 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".spotlight",
          { opacity: 0, scale: 0.5 },
          { duration: 0.8, ease: "easeOut" },
        );
        animate(
          ".brandDiv",
          { opacity: 0, y: 20 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          ".logo",
          { opacity: 0, y: 20 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
      }
    };
    aimation();
  }, [isInView]);

  return (
    <section ref={scope} className="section lg:mt-20">
      <div className="h-125 relative flex flex-col gap-8 items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          className="spotlight absolute -z-10 size-75 md:size-125 rounded-full blur-[160px] bg-[radial-gradient(circle,var(--primary)_0%,transparent_60%)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          className=" text-color-text text-h1/18 font-black leading-[1.1] letter-tight"
        >
          Bringing Your <br />
          Dream Into <span className="text-primary italic">Reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          className="text-text/80 max-w-[42ch] text-body"
        >
          We increase revenue and ensure sustainable long-term growth for your
          business through powerful Webflow websites.
        </motion.p>
        <motion.div className="buttonDiv" initial={{ opacity: 0, y: 20 }}>
          <Button
            onClick={() => alertUser("Meeting booked!")}
            title="Book A Meeting"
            variant="primary"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Star className="top-[18%] right-[12%] size-7 lg:size-24 opacity-70" />
          <Star className="bottom-[20%] left-[10%] size-6 lg:size-12 opacity-50" />
          <Star className="top-[30%] left-[20%] size-5 lg:size-10 opacity-40" />
          <Star className="bottom-[10%] right-[25%] size-5 lg:size-12 opacity-60" />
        </div>
      </div>
      <Brand />
    </section>
  );
}

const logos = [FluxaLogo, LumixLogo, NexaLogo, OrbixLogo, VeloraLogo];

function Brand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      className="brandDiv flex flex-col items-center gap-8 "
    >
      <header className="flex items-center">
        <div className="h-0.5 w-10 bg-primary" />
        <h2 className="uppercase px-8 font-bold text-small">
          Trusted by amazing brands
        </h2>
        <div className="h-0.5 w-10 bg-primary" />
      </header>
      <div className="rounded-2xl grid grid-cols-5 gap-6 px-8 py-5 bg-background-light">
        {logos.map((Logo, index) => {
          const MotionLogo = motion(Logo);
          return (
            <MotionLogo
              initial={{ opacity: 0, y: 20 }}
              key={index}
              className="logo w-full h-full max-h-10 object-contain text-white opacity-60"
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <motion.img
      initial={{ opacity: 0, scale: 0.5 }}
      src="icons/Star.svg"
      alt="Star Icon"
      className={`star absolute ${className}`}
    />
  );
}
