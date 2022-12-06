import React, { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import useWindowWidth from "../../useWindowWidth";
import RailArrowIcon from "./RailArrowIcon";

//withButtonMargins - true / false

function HorizontalRail({ children, withButtonMargins = true, gap = 3, height }) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const { windowWidth } = useWindowWidth();
  const carouselRef = useRef();
  const controls = useDragControls();

  useEffect(() => {
    setCarouselWidth(carouselRef.current.scrollWidth);
  }, [windowWidth]);

  return (
    <div className={`bg-primary-2 relative h-[100px]`}>
      <div className="w-full overflow-hidden absolute">
        <motion.div
          className={`flex gap-${gap} ${windowWidth > carouselWidth ? "justify-center" : "justify-start"}`}
          ref={carouselRef}
          drag="x"
          dragControls={controls}
          dragElastic={0.2}
          dragConstraints={{ left: -carouselWidth, right: 0 }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default HorizontalRail;
