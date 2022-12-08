import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const variants = {
  hidden: { opacity: 0, x: 200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
};

export default function TransitionLayout({ children, key }) {
  const router = useRouter();
  const [transitionDirection, setTransitionDirection] = useState("forward");
  //let transitionDirection = "forward";
  useEffect(() => {
    console.log("TransitionLayout mounting");
    //transitionDirection = router.query.transition;
    setTransitionDirection(router.query.transition);
    console.log(router.query.transition);
  }, []);

  return (
    <motion.div
      variants={variants}
      initial={transitionDirection === "back" ? "exit" : "hidden"}
      animate="enter"
      exit={transitionDirection === "back" ? "hidden" : "exit"}
      key={key}>
      {children}
    </motion.div>
  );
}
