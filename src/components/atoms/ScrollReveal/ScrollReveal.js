import { useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

/**
 * Props do rozszerzenia na styled(motion.*) — scroll reveal z obsługą prefers-reduced-motion.
 */
export function useScrollRevealProps({
  delay = 0,
  y = 28,
  once = true,
  amount = 0.18,
  margin = "-10% 0px -8% 0px",
  duration = 0.58,
} = {}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, margin, amount },
    transition: { duration, ease: easeOut, delay },
  };
}

export { easeOut };
