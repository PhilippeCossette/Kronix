import { stagger, motion, useAnimate, useInView } from "framer-motion";
import Button from "./Button";
import Tag from "./Tag";
import StarList from "@/logos/Star-list.svg?react";
import { useEffect } from "react";
import alertUser from "../utils/alertUser";

type Props = {};

export default function Pricing({}: Props) {
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
          ".pricing-card",
          { opacity: 1, scale: 1 },
          { duration: 0.4, ease: "easeOut", delay: stagger(0.1) },
        );
      } else {
        animate(
          "h2",
          { opacity: 0, y: -40 },
          { duration: 0.7, ease: "easeOut" },
        );
        animate(
          "p",
          { opacity: 0, y: -40 },
          { duration: 0.4, ease: "easeOut" },
        );
        animate(
          ".pricing-card",
          { opacity: 0, scale: 0.5 },
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
    <section ref={scope} className="section flex flex-col items-center gap-12">
      <header className="text-center flex flex-col items-center gap-1">
        <motion.p
          initial={{ opacity: 0, y: -40 }}
          className="text-small text-primary uppercase"
        >
          Clear & Simple Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          className="text-h2 font-bold mb-5"
        >
          Simple pricing to level up your brand.
        </motion.h2>
        <p className="text-small font-thin max-w-xs tracking-wide">
          Senior experts. On-demand requests. Fast turnaround. Flat monthly
          fees. Cancel anytime.
        </p>
      </header>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {pricingCards.map((card) => (
          <PricingCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

const pricingCards: PricingCardProps[] = [
  {
    title: "Standard",
    tag: "Most Popular",
    tagVariant: "primary",
    description:
      "One request at a time. For companies who need on-going design support.",
    price: "$2,995/m",
    priceDescription: "Pause or cancel anytime",
    features: [
      "1x active task at a time",
      "Unlimited revisions",
      "Dedicated project manager",
      "Daily comms through Slack",
      "Work with senior designers",
      "2-3 days turn around time",
      "Top tier design",
    ],
    callButtonAction: () => {
      alertUser("Book call - Standard");
    },
    buyButtonAction: () => {
      alertUser("Buy - Standard");
    },
  },
  {
    title: "Growth",
    tag: "Best value",
    tagVariant: "white",
    description:
      "Double the requests. For companies with increasing design needs. Limited spots.",
    price: "$4,795/m",
    priceDescription: "Pause or cancel anytime",
    features: [
      "2x active task at a time",
      "Unlimited revisions",
      "Dedicated project manager",
      "Daily comms through Slack",
      "Work with senior designers",
      "2-3 days turn around time",
      "Top tier design",
    ],
    callButtonAction: () => {
      alertUser("Book call - Growth");
    },
    buyButtonAction: () => {
      alertUser("Buy - Growth");
    },
  },
  {
    title: "Basic - Weekly",
    tag: "",
    tagVariant: "none",
    description:
      "Perfect if you want to try the subscription out or only have a few one-off tasks.",
    price: "$890/m",
    priceDescription: "Paid per weekly",
    features: [
      "Fixed scope of work",
      "2 rounds of revisions",
      "Dedicated project manager",
      "Daily comms through Slack",
      "1x designer",
      "2-5 days turn around time",
      "Top tier design",
    ],
    callButtonAction: () => {
      alertUser("Book call - Basic");
    },
    buyButtonAction: () => {
      alertUser("Buy - Basic");
    },
  },
];

type PricingCardProps = {
  title: string;
  tag: string;
  tagVariant: "primary" | "white" | "none";
  description: string;
  price: string;
  priceDescription: string;
  features: string[];
  callButtonAction: () => void;
  buyButtonAction: () => void;
};

function PricingCard({
  title,
  tag,
  tagVariant,
  description,
  price,
  priceDescription,
  features,
  callButtonAction,
  buyButtonAction,
}: PricingCardProps) {
  return (
    <motion.div
      id="pricing"
      initial={{ opacity: 0, scale: 0.5 }}
      className="pricing-card grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-1 border border-primary/40 p-8 bg-background-light rounded-2xl"
    >
      <header className="flex flex-col gap-3">
        <div className="space-y-6 pb-3">
          <span className="flex items-center gap-5">
            <h3 className="text-h2 md:text-h3 lg:text-h4 font-bold">{title}</h3>
            {tagVariant !== "none" && (
              <Tag
                variant={tagVariant}
                title={tag}
                textSize="text-extra-small"
                paddingX="px-2"
                paddingY="py-1"
              />
            )}
          </span>
          <p className="text-extra-small font-thin">{description}</p>
        </div>
        <hr className="border-primary/40" />
        <div className="pb-3">
          <h4 className="text-h1 md:text-h2 lg:text-h3 text-primary font-bold">
            {price}
          </h4>
          <p className="text-extra-small font-thin">{priceDescription}</p>
        </div>
        <hr className="border-primary/40" />
      </header>
      <div className="flex flex-col gap-3 py-3">
        {features.map((feature) => (
          <p key={feature} className="flex items-center text-body gap-5">
            <StarList />
            {feature}
          </p>
        ))}
      </div>
      <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:col-span-2 lg:col-span-1">
        <Button
          onClick={() => callButtonAction()}
          title={"Book a call"}
          variant="secondary"
        />
        <Button
          onClick={() => buyButtonAction()}
          title={"Buy now"}
          variant="primary"
        />
      </footer>
    </motion.div>
  );
}
