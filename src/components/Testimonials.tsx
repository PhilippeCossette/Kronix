import { AnimatePresence, motion, useInView } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import FluxaLogo from "@/logos/fluxa-logo.svg?react";
import LumixLogo from "@/logos/lumix-logo.svg?react";
import NexaLogo from "@/logos/nexa-logo.svg?react";
import OrbixLogo from "@/logos/orbix-logo.svg?react";
import VeloraLogo from "@/logos/velora-logo.svg?react";
type Props = {};

type Testimonial = {
  brandLogo: React.FC<React.SVGProps<SVGSVGElement>>;
  brand: string;
  name: string;
  headline: string;
  quote: string;
  jobTitle: string;
  picture: string;
};

const testimonials: Testimonial[] = [
  {
    brandLogo: FluxaLogo,
    brand: "Fluxa",
    name: "Diana Loreza",
    headline:
      "Kornix Is The Best Digital Agency I Have Ever Seen! Highly Recommended!",
    quote:
      "I recently hired Kornix for a custom web development project and couldn't be happier with the results. The team brought my ideas to life and delivered a website that truly stands out.",
    jobTitle: "Director of Fluxa",
    picture: "diana-lorenza.webp",
  },
  {
    brandLogo: VeloraLogo,
    brand: "Velora",
    name: "Marcus Chen",
    headline:
      "They Completely Transformed Our Platform Into Something Modern And Powerful.",
    quote:
      "From start to finish, the experience was seamless. Kornix upgraded our outdated system into a fast, scalable, and visually stunning product.",
    jobTitle: "Founder of VELORA",
    picture: "marcus-chen.webp",
  },
  {
    brandLogo: NexaLogo,
    brand: "Nexa",
    name: "Sophie Laurent",
    headline: "Our Conversion Rates Skyrocketed After Launch.",
    quote:
      "Their attention to detail and design thinking made a huge difference. The new experience feels polished and performs incredibly well.",
    jobTitle: "Marketing Lead at NEXA",
    picture: "sophie-laurent.webp",
  },
  {
    brandLogo: OrbixLogo,
    brand: "Orbix",
    name: "Daniel Reyes",
    headline: "A Premium Digital Presence That Truly Represents Our Brand.",
    quote:
      "Kornix helped us elevate everything — from visuals to performance. The result feels modern, clean, and aligned with our vision.",
    jobTitle: "CEO of ORBIX",
    picture: "daniel-reyes.webp",
  },
  {
    brandLogo: FluxaLogo,
    brand: "Fluxa",
    name: "Emma Novak",
    headline: "They Truly Understand Modern UI And User Experience.",
    quote:
      "The final result was fast, intuitive, and beautifully designed. It’s exactly what we needed for our users.",
    jobTitle: "Product Manager at FLUXA",
    picture: "emma-novak.webp",
  },
  {
    brandLogo: LumixLogo,
    brand: "Lumix",
    name: "Julien Moreau",
    headline: "Creative, Precise, And Extremely Professional Team.",
    quote:
      "Kornix executed our ideas perfectly. The collaboration was smooth and the final product exceeded expectations.",
    jobTitle: "Creative Director at LUMIX",
    picture: "julien-moreau.webp",
  },
];

export default function Testimonials({}: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (direction: number) => {
    setDirection(direction);
    setIndex(
      (prev) => (prev + direction + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [index]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-full bg-white flex flex-col items-center gap-8"
    >
      <header className="text-text-dark text-center max-w-xl flex flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-small uppercase font-medium"
        >
          Testimonial
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-h2 font-extrabold"
        >
          Customer is Our Top Priority
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-small max-w-sm"
        >
          We survey all of our clients, the results of which go directly to our
          CEO.
        </motion.p>
      </header>
      <div className="w-full max-w-[90%] md:max-w-4xl flex items-center gap-4 text-text-dark">
        <button
          aria-label="Previous Slide"
          className="shadow-lg border border-black/20 p-2 rounded-full"
          onClick={() => paginate(-1)}
        >
          <IoIosArrowBack />
        </button>
        <div className="flex-1 overflow-hidden rounded-2xl">
          <AnimatePresence custom={direction} mode="wait">
            <AnimatedCard
              key={testimonials[index].name}
              testimonial={testimonials[index]}
              direction={direction}
            />
          </AnimatePresence>
        </div>
        <button
          aria-label="Next Slide"
          className="shadow-lg border border-black/20 p-2 rounded-full"
          onClick={() => paginate(1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
}

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
  }),
};

function AnimatedCard({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: number;
}) {
  return (
    <motion.div
      key={testimonial.name}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" as const }}
      className="overflow-hidden"
    >
      <TestimonialCard testimonial={testimonial} />
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { brandLogo, name, headline, quote, picture, jobTitle } = testimonial;

  const BrandLogo = brandLogo;
  return (
    <div className="grid md:grid-cols-[60%_auto] gap-8 md:items-center p-5 py-10 md:p-12 bg-background-gray/20 border border-background-gray rounded-4xl min-h-100 md:min-h-120">
      {/* left Side */}
      <div className="flex flex-col gap-3">
        <BrandLogo className="text-black w-24 h-10 mb-4" />

        <h3 className="text-h4 font-bold">{headline}</h3>
        <p className="text-body/7">{quote}</p>

        <div className="mt-4">
          <p className="font-bold">{name}</p>
          <p className="font-thin">{jobTitle}</p>
        </div>
      </div>
      {/* Right Side */}
      <div className="mx-auto md:md-0 hidden md:block max-w-87.5 aspect-square rounded-full overflow-hidden">
        <img
          className="w-full h-full max-w-100 object-cover"
          src={`testimonials/persons/${picture}`}
          alt={`${name}'s picture`}
        />
      </div>
    </div>
  );
}
