import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const imgData = [
  "Portfolio-1.webp",
  "Portfolio-2.webp",
  "Portfolio-3.webp",
  "Portfolio-4.webp",
  "Portfolio-5.webp",
  "Portfolio-6.webp",
  "Portfolio-7.webp",
  "Portfolio-8.webp",
  "Portfolio-9.webp",
  "Portfolio-10.webp",
  "Portfolio-11.webp",
  "Portfolio-12.webp",
];

export default function Portfolio() {
  const columns = Array.from({ length: 4 }, (_, i) =>
    imgData.slice(i * 3, i * 3 + 3),
  );
  return (
    <section
      id="portfolio"
      className="section-full flex flex-col gap-8 justify-center bg-white text-text-dark"
    >
      <header className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-h2 font-extrabold">Our Beautiful Works</h2>
        <p className="text-body max-w-md">
          We help our clients grow their bottom-line with clear and professional
          websites.
        </p>
      </header>
      <PortfolioGrid columns={columns} />
    </section>
  );
}

function PortfolioGrid({ columns }: { columns: string[][] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const colEven = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const colOdd = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className=" grid grid-cols-4 gap-5" ref={containerRef}>
      {columns.map((col, colIndex) => (
        <motion.div
          style={{
            y: colIndex % 2 === 0 ? colEven : colOdd,
            opacity,
          }}
          className={`${colIndex % 2 === 0 ? "mt-12" : ""} space-y-5`}
          key={colIndex}
        >
          {col.map((img, imgIndex) => (
            <div
              className="border border-gray-300 w-full aspect-square"
              key={imgIndex}
            >
              <img
                className="w-full h-full object-cover"
                src={`/portfolio/${img}`}
                alt=""
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
