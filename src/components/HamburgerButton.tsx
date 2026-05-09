import { motion } from "framer-motion";

export default function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      aria-label="Toggle Mobile Menu"
      initial={{ opacity: 0, x: 20 }}
      onClick={onClick}
      className="burger-button flex cursor-pointer flex-col group justify-center items-center w-10 h-10 gap-1.5"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="block w-6 h-0.5 bg-white group-hover:bg-current/70 origin-center transition-all duration-150"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="block w-6 h-0.5 bg-white group-hover:bg-current/70 origin-center transition-all duration-150"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="block w-6 h-0.5 bg-white group-hover:bg-current/70 origin-center transition-all duration-150"
      />
    </motion.button>
  );
}
