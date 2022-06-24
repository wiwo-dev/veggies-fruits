import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import useWindowWidth from "../../useWindowWidth";
import RailArrowIcon from "./RailArrowIcon";

//withButtonMargins - true / false

function HorizontalRail({ children, height, withButtonMargins = true, oneClickDistance = 150 }) {
  const buttonMargin = withButtonMargins ? 50 : 0;
  //const oneClickDistance = 150;
  const [horizontalScroll, setHorizontalScroll] = useState(buttonMargin);
  const { windowWidth } = useWindowWidth();
  const railRef = useRef();

  const handleChangeScroll = (direction) => {
    const newScrollPositon = horizontalScroll + direction * oneClickDistance;
    if (
      newScrollPositon <= buttonMargin &&
      newScrollPositon > -(railRef.current.getBoundingClientRect().width + oneClickDistance)
    ) {
      console.log("Moving by ", direction * oneClickDistance, "px ||| new scroll: ", newScrollPositon);
      setHorizontalScroll(newScrollPositon);
    } else {
      console.log("Not moving");
      console.log("horizontalScroll + direction * distance: ", horizontalScroll + direction * oneClickDistance);
      console.log("Window width: ", windowWidth);
      const actualScrollPosition = horizontalScroll;
      setHorizontalScroll(actualScrollPosition - 20);
      setHorizontalScroll(actualScrollPosition);
    }
  };

  return (
    <div className="bg-primary-3 my-5 max-w-full relative">
      <div className={`absolute left-0 top-0 z-10 min-w-[30px] h-[${height}px] flex items-center justify-center`}>
        <button className="px-5 py-5 bg-sage bg-opacity-10 rounded-xl" onClick={() => handleChangeScroll(1)}>
          <RailArrowIcon direction="left" />
        </button>
      </div>
      <div className="w-full overflow-hidden absolute">
        <motion.div ref={railRef} animate={{ x: horizontalScroll }} className="flex">
          {children}
        </motion.div>
      </div>
      <div className={`absolute right-0 top-0 z-10 min-w-[30px] h-[${height}px]  flex items-center justify-center`}>
        <button className="px-5 py-5 bg-sage bg-opacity-10 rounded-xl" onClick={() => handleChangeScroll(-1)}>
          <RailArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

export default HorizontalRail;
