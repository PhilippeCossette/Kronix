import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type Props = {
  title: string;
  textSize?: string;
  paddingX?: string;
  paddingY?: string;
  variant?: "primary" | "white";
} & Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition" | "whileHover" | "whileTap"
>;

export default function Tag({
  title,
  textSize,
  paddingX,
  paddingY,
  variant = "primary",
  ...motionProps
}: Props) {
  return (
    <motion.div
      className={`${paddingX || "px-5"} ${paddingY || "py-2"} tags text-text-dark ${textSize || "text-small"} rounded-md ${variant === "primary" ? "bg-primary" : "bg-white"}`}
      {...motionProps}
    >
      {title}
    </motion.div>
  );
}
