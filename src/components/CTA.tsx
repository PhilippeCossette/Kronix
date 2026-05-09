import { useEffect } from "react";
import Button from "./Button";
import { stagger, useAnimate, useInView, motion } from "framer-motion";

type Props = {};

export default function CTA({}: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const animation = async () => {
      if (isInView) {
        await animate(
          ".cta",
          { opacity: 1, y: 0 },
          { duration: 0.7, ease: "easeOut" },
        );
        await animate(
          "h2",
          { opacity: 1, y: 0 },
          { duration: 0.7, ease: "easeOut" },
        );
        await animate(
          "p, .button",
          { opacity: 1, y: 0 },
          { duration: 0.4, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".shadow",
          { opacity: 1, scale: 1 },
          { duration: 0.8, ease: "easeOut" },
        );
      } else {
        animate(
          "h2",
          { opacity: 0, y: 20 },
          { duration: 0.7, ease: "easeOut" },
        );
        await animate(
          "p, .button",
          { opacity: 0, y: 20 },
          { duration: 0.4, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".shadow",
          { opacity: 0, scale: 0 },
          { duration: 0.8, ease: "easeOut" },
        );
      }
    };

    animation();
  }, [isInView]);
  return (
    <section
      ref={scope}
      className="section flex items-center justify-center bg-[linear-gradient(180deg,white_50%,var(--background)_50%)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        className="cta relative overflow-clip w-[90%] grid justify-items-center gap-8 rounded-4xl py-12 px-12 md:px-24 bg-cta-background"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          className="shadow absolute z-10 size-75 md:size-125 rounded-full blur-[160px] bg-[radial-gradient(circle,var(--primary)_0%,transparent_40%)]"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          className="text-h2/11 md:max-w-[15ch] font-extrabold text-center"
        >
          Become part of the design revolution
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          className="max-w-[30ch] text-body font-thin text-center"
        >
          Jump on a membership and start requesting designs right away!
        </motion.p>
        <Button
          initial={{ opacity: 0, y: 20 }}
          title="See Pricing"
          variant="primary"
          onClick={() => console.log("Button clicked!")}
        />
      </motion.div>
    </section>
  );
}
