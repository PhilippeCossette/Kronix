import {
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  useInView,
} from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {};

type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "How fast will I receive my designs?",
    answer:
      "Most requests are completed within 2–3 business days. Larger or more complex tasks may take longer, but you’ll always be updated on progress.",
  },
  {
    question: "What does unlimited revisions mean?",
    answer:
      "You can request as many revisions as needed until you’re satisfied. We keep refining the design based on your feedback.",
  },
  {
    question: "How many requests can I have at once?",
    answer:
      "It depends on your plan. Standard allows 1 active request, while Growth allows 2 active requests at the same time.",
  },
  {
    question: "Can I pause or cancel my subscription?",
    answer:
      "Yes. You can pause or cancel your subscription at any time. Your remaining time will be saved for when you return.",
  },
  {
    question: "What types of design do you support?",
    answer:
      "We handle most design needs including web design, landing pages, UI/UX, branding, and marketing assets.",
  },
  {
    question: "How do we communicate?",
    answer:
      "We communicate daily through Slack to keep things fast and efficient. You’ll also have a dedicated project manager.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "No long-term contracts. You can subscribe for a month, a week, or cancel anytime depending on your needs.",
  },
  {
    question: "What if I only have a few small tasks?",
    answer:
      "The weekly plan is perfect for smaller or one-off tasks. It’s a flexible way to try the service without committing long-term.",
  },
];

export default function FAQ({}: Props) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    const aimation = async () => {
      if (isInView) {
        animate(
          ".faq-item",
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: "easeOut", delay: stagger(0.2) },
        );
      }
    };

    aimation();
  }, [isInView]);

  return (
    <section
      id="faq"
      ref={scope}
      className="section-full bg-white text-text-dark"
    >
      <header className="flex flex-col items-center mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          className="text-h2 font-bold"
        >
          FAQ's
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          className="text-body font-thin"
        >
          Providing answers to your questions
        </motion.p>
      </header>
      <div className="mx-section-x grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      onClick={() => setIsOpen(!isOpen)}
      className="faq-item bg-background cursor-pointer  text-white rounded-2xl py-4 px-6"
    >
      <div className="flex gap-4 justify-between items-center">
        <h3 className="text-h5 font-semibold">{question}</h3>
        <div
          role="button"
          className="bg-primary cursor-pointer text-black flex items-center justify-center text-2xl p-2 rounded-full"
        >
          <motion.button
            className="cursor-pointer"
            aria-label="Toggle Faq"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 180,
            }}
          >
            <IoIosArrowDown />
          </motion.button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p className="text-body font-thin mt-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
