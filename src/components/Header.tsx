import { useAnimate, motion, useInView, stagger } from "framer-motion";
import Button from "./Button";
import { useEffect } from "react";

type Props = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export default function Header({
  subtitle,
  title,
  description,
  buttonText,
  onClick,
}: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: false, margin: "-100px" });

  useEffect(() => {
    const animation = async () => {
      if (isInView) {
        await animate(
          "h1",
          { opacity: 1, y: 0 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          "p, .button",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.5) },
        );
      } else {
        animate(
          "h1",
          { opacity: 0, y: 20 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          "p, .button",
          { opacity: 0, y: 20 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.5) },
        );
      }
    };
    animation();
  }, [isInView]);

  return (
    <motion.section
      ref={scope}
      className="section grid md:grid-cols-2 gap-8 md:gap-12"
    >
      <div className="flex flex-col gap-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          className="text-small text-primary uppercase"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          className="leading-[1.2] text-h2 font-bold"
        >
          {title}
        </motion.h1>
      </div>
      <div className="md:mt-9 flex flex-col items-start gap-8">
        <motion.p initial={{ opacity: 0, y: 20 }} className="text-h4 font-thin">
          {description}
        </motion.p>
        <Button
          initial={{ opacity: 0, y: 20 }}
          title={buttonText}
          variant="primary"
          onClick={onClick}
        />
      </div>
    </motion.section>
  );
}
