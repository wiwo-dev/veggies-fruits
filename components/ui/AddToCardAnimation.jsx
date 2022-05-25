import JsonPreviewer from "components/JsonPreviewer";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AddToCardAnimation({ children, targetRef }) {
  const cardPosition = { x: 300, y: 100 };
  const [animation, setAnimation] = useState(true);

  const controls = useAnimation();
  const movingElement = useRef();

  const startAnimation = () => {
    setAnimation(true);
    const targetX = targetRef.current.getBoundingClientRect().x;
    const targetY = targetRef.current.getBoundingClientRect().y;
    const myX = movingElement.current.getBoundingClientRect().x;
    const myY = movingElement.current.getBoundingClientRect().y;

    controls.start({
      x: [0, targetX - myX],
      y: [0, targetY - myY],
      opacity: [1, 0],
      transition: { delay: 0, duration: 1 },
    });
  };

  const handleClick = () => {
    setAnimation(true);
    startAnimation();
  };

  return (
    <div className="relative" onClick={handleClick}>
      {children}

      <motion.div
        ref={movingElement}
        className="absolute top-0 left-0"
        animate={controls}
        onAnimationComplete={() => {
          setAnimation(false);
          console.log("ANIMATION COMPLETED");
        }}>
        {true && children}
      </motion.div>
    </div>
  );
}
