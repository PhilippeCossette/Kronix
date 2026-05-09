import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
} & Pick<
  HTMLMotionProps<"button">,
  "initial" | "animate" | "exit" | "transition" | "whileHover" | "whileTap"
>;

export default function Button({
  title,
  variant = "primary",
  className,
  onClick,
  ...motionProps
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-black",
    outline: "border border-black text-black bg-white",
    secondary: "border border-primary text-white",
  };

  return (
    <motion.button
      {...motionProps}
      className={`${className} ${variantClasses[variant]} font-semibold button cursor-pointer rounded-md px-4 py-3 md:px-6 md:py-4`}
      onClick={onClick}
    >
      {title}
    </motion.button>
  );
}
