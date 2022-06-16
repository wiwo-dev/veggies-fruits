import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

export default function TransitionLayout({ children }) {
  return (
    <motion.div
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      //transition={{ duration: 1000, type: "linear" }} // Set the transition to linear
    >
      {children}
    </motion.div>
  );
}
