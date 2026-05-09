import { useAnimate, useInView, motion, stagger } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  items: TimeLineItem[];
};

type TimeLineItem = {
  title: string;
  description: string;
  icon: string;
  isLastItem?: boolean;
};

export default function TimeLine({ items }: Props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        animate(
          ".timeline-item",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".arrow",
          { opacity: 1, scale: 1 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
      } else {
        animate(
          ".timeline-item",
          { opacity: 0, y: -40 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
        animate(
          ".arrow",
          { opacity: 0, scale: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.3) },
        );
      }
    };
    aimation();
  }, [isInView]);

  return (
    <motion.section
      id="process"
      ref={scope}
      className="section grid md:grid-cols-3 gap-8 md:gap-5"
    >
      {items.map((item, index) => (
        <TimeLineItem key={index} width={screenWidth} {...item} />
      ))}
    </motion.section>
  );
}

function TimeLineItem({
  title,
  description,
  icon,
  isLastItem,
  width,
}: TimeLineItem & { width: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      className="timeline-item flex-col gap-4  md:h-fit items-start md:items-stretch"
    >
      <header className="mb-4 flex items-center justify-start">
        <div className="p-4 shrink-0 aspect-square bg-primary rounded-full ">
          <img className="size-10" src={icon} alt={`${title} Icon`} />
        </div>
        {!isLastItem && width > 768 && <Arrow isMobile={false} />}
      </header>
      <div>
        <h3 className="text-h4 font-bold mb-5">{title}</h3>
        <p className="text-body font-thin md:max-w-[75%]">{description}</p>
      </div>
      {!isLastItem && width <= 768 && <Arrow isMobile={true} />}
    </motion.div>
  );
}

function Arrow({ isMobile }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        className="arrow ml-9 mt-4 w-0.5 h-12.5 bg-primary relative flex justify-center"
      >
        <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-primary absolute bottom-0 -translate-x-1/2 left-1/2" />
      </motion.span>
    );
  }
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      className="arrow h-0.5 flex-1 flex items-center justify-end bg-primary relative"
    >
      <div className="w-2 h-2 -rotate-45 border-r-2 border-b-2 border-primary" />
    </motion.span>
  );
}
