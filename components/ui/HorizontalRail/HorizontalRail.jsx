import React, { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import useWindowWidth from "../../useWindowWidth";

function HorizontalRail({ children, withButtonMargins = true, gap = 3, height = "100px" }) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [leftConstraints, setLeftConstraints] = useState(0);
  const { windowWidth } = useWindowWidth();
  const carouselRef = useRef();

  useEffect(() => {
    const pos1 = carouselRef.current.children[0].getClientRects()[0].x;
    const pos2 =
      carouselRef.current.children[carouselRef.current.children.length - 1].getClientRects()[0].x +
      carouselRef.current.children[carouselRef.current.children.length - 1].getClientRects()[0].width;
    const childrensWidth = pos2;

    //setCarouselWidth(carouselRef.current.scrollWidth);
    setCarouselWidth(childrensWidth);
    console.log(childrensWidth);
    setLeftConstraints(childrensWidth - windowWidth + 20);
    //console.log(carouselRef.current.scrollWidth);
  }, [windowWidth]);

  return (
    <div className={`bg-primary-2 relative py-2`}>
      <div className="w-full overflow-hidden">
        <motion.div
          className={`flex gap-${gap} ${windowWidth > carouselWidth ? "justify-center" : "justify-start"}`}
          ref={carouselRef}
          drag={windowWidth < carouselWidth ? "x" : ""}
          dragElastic={0.2}
          dragConstraints={{ left: -leftConstraints, right: 0 }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default HorizontalRail;
