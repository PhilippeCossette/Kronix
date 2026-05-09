import Tag from "./Tag";
import Header from "./Header";
import { useAnimate, useInView, motion, stagger } from "framer-motion";
import { useEffect } from "react";
import scrollToSection from "../utils/scrollToSection";

type Props = {};

const services = [
  "Web design & UI",
  "Social media visuals",
  "Infographics",
  "Design system",
  "Email design",
  "Stationery",
  "Icons ",
  "Packaging & merch",
  "Signage",
  "Brochures",
  "Logos & branding",
  "Digital ads",
  "Wireframes",
];

const benefits = [
  {
    title: "On-demand requests",
    description:
      "Put all your requests in the design queue in Trello, and we’ll knock them out 1 by 1.",
    icon: "infinity.svg",
  },
  {
    title: "Top-notch quality",
    description:
      "High-end work from a dedicated team of senior designers that's always available when you need it.",
    icon: "lightning.svg",
  },
  {
    title: "Powered by - Webflow",
    description:
      "We build every site on Webflow, making them dynamic, accessible, and easily scalable. It’s easy for you like Squarespace but better.",
    icon: "webflow.svg",
  },
  {
    title: "Fast. Responsive. Reliable.",
    description:
      "Get regular updates on your projects and can expect to receive your designs within 2-3 days.",
    icon: "design.svg",
  },
  {
    title: "No Lock in contracts",
    description:
      "Pay the same every month, no surprises. You can use it for as long as you want and cancel anytime.",
    icon: "calendar.svg",
  },
  {
    title: "Great value for money",
    description:
      "Get the power of dedicated design team at fraction of the cost of full-time employee. ($54k/yr vs. $112k/yr).",
    icon: "value.svg",
  },
  {
    title: "Customized for you",
    description:
      "We design and build custom for you. We’re never starting from a template unless you want that? You don't, right?",
    icon: "gear.svg",
  },
  {
    title: "Creative paying",
    description:
      "We’re here when you need us and not on payroll when you don’t.",
    icon: "paying.svg",
  },
  {
    title: "Expert turnovers",
    description:
      "You’re getting 10+ years of design experience with every request. No hand-holding required.",
    icon: "expert.svg",
  },
];

export default function Services({}: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        await animate(
          "h2",
          { opacity: 1, y: 0 },
          { duration: 0.7, ease: "easeOut" },
        );
        animate("p", { opacity: 1, y: 0 }, { duration: 0.4, ease: "easeOut" });
        animate(
          ".tags",
          { opacity: 1, y: 0 },
          { duration: 0.4, ease: "easeOut", delay: stagger(0.1) },
        );
      } else {
        animate(
          "h2",
          { opacity: 0, y: 20 },
          { duration: 0.7, ease: "easeOut" },
        );
        animate("p", { opacity: 0, y: 20 }, { duration: 0.4, ease: "easeOut" });
        animate(
          ".tags",
          { opacity: 0, y: 20 },
          {
            duration: 0.4,
            ease: "easeOut",
            delay: stagger(0.1, { from: "last" }),
          },
        );
      }
    };
    aimation();
  }, [isInView]);

  return (
    <motion.section id="services" ref={scope} className="section">
      <header className="flex flex-col items-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          className="text-small text-primary uppercase"
        >
          Our Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          className="text-h2 font-extrabold"
        >
          We can help you with...
        </motion.h2>
      </header>
      <div className="flex gap-2 flex-wrap justify-center">
        {services.map((service, index) => (
          <Tag
            initial={{ opacity: 0, y: 20 }}
            key={index}
            title={service}
            variant="primary"
          />
        ))}
      </div>
      <Header
        subtitle="Benefits"
        title="The design subscription that connects you to your dream team"
        description="A subscription can alleviate the stress of staffing, managing expenses, or make design calls like a Creative Director. We partner with you to ensure that your design elevates your brand to new levels."
        buttonText="See Pricing"
        onClick={() => scrollToSection("pricing")}
      />
      <ServiceSection />
    </motion.section>
  );
}

function ServiceSection() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        animate(
          ".service-card",
          { opacity: 1, scale: 1 },
          { duration: 0.4, ease: "easeOut", delay: stagger(0.1) },
        );
      } else {
        animate(
          ".service-card",
          { opacity: 0, scale: 0.8 },
          {
            duration: 0.4,
            ease: "easeOut",
            delay: stagger(0.1, { from: "last" }),
          },
        );
      }
    };
    aimation();
  }, [isInView]);
  return (
    <motion.div ref={scope} className="md:grid grid-cols-3 py-8">
      {benefits.map((benefit, index) => (
        <ServiceCard
          key={benefit.title}
          title={benefit.title}
          description={benefit.description}
          icon={benefit.icon}
          index={index}
        />
      ))}
    </motion.div>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  index: number;
  icon: string;
};

function ServiceCard({ title, description, index, icon }: ServiceCardProps) {
  const getBorder = (index: number) => {
    const col = index % 3;
    const row = Math.floor(index / 3);

    const borderRight = col < 2 ? "md:border-r" : "";
    const borderBottom = row < 2 ? "md:border-b" : "";

    return `${borderRight} ${borderBottom} border-background-light`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      className={`service-card p-8 ${getBorder(index)}`}
    >
      <img className="size-8" src={`/icons/${icon}`} alt="" />
      <h3 className="text-h5 font-bold mt-4 mb-2">
        {index + 1}. {title}
      </h3>
      <p className="text-small font-thin">{description}</p>
    </motion.div>
  );
}
