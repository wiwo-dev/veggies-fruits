import React, { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import useWindowWidth from "../../useWindowWidth";
import RailArrowIcon from "./RailArrowIcon";

//withButtonMargins - true / false

function HorizontalRail({ children, withButtonMargins = true, gap = 3, height }) {
  const buttonMargin = withButtonMargins ? 60 : 0;
  const [horizontalScroll, setHorizontalScroll] = useState(buttonMargin);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const [childrenWidths, setChildrenWidths] = useState([]);
  const [oneClickDistance, setOneClickDistance] = useState(0);
  const { windowWidth } = useWindowWidth();
  const carouselRef = useRef();
  const xPosRef = useRef(buttonMargin);

  const controls = useDragControls();

  useEffect(() => {
    setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    const childrenWidths = Array.from(carouselRef.current.children).map((children) => children.offsetWidth);
    setChildrenWidths(childrenWidths);
    const totalChildrenWidth = childrenWidths.reduce((acc, cur) => acc + cur, 0);
    const gapInPixels = (carouselRef.current.scrollWidth - totalChildrenWidth) / (childrenWidths.length - 1);
    //console.log("gapInPixels: ", gapInPixels);
    setOneClickDistance(childrenWidths[0] + gapInPixels);
  }, [windowWidth, carouselWidth]);

  //to fix the issue with constraints not working correctly after screen resize
  const checkConstraints = (xposition) => {
    const carouselWidth2 = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
    if (xposition > buttonMargin) {
      //console.log("Position is too HIGH");
      setHorizontalScroll(buttonMargin);
    } else if (xposition < -carouselWidth2 - buttonMargin) {
      //console.log("Position is too LOW");
      setHorizontalScroll(-carouselWidth2 - buttonMargin);
    } else {
      //console.log("POSITION OK");
    }
  };

  const handleChangeScroll = (direction) => {
    let newScrollPositon = xPosRef.current + direction * oneClickDistance;

    // console.log("xPosRef.current: ", xPosRef.current);
    // const modulo = newScrollPositon % oneClickDistance;
    // const diff =
    //   (newScrollPositon / oneClickDistance - Math.floor(newScrollPositon / oneClickDistance)) * oneClickDistance;
    // console.log("modulo: ", modulo);
    // console.log("diff: ", diff);
    // const activeChildren = Math.round(newScrollPositon / oneClickDistance);
    // console.log("activeChildren: ", activeChildren);

    // console.log("POSSIBLE MODULO 1: ", buttonMargin);
    // console.log("POSSIBLE MODULO 2: ", buttonMargin - oneClickDistance);
    const carouselWidth2 = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
    if (newScrollPositon > buttonMargin) {
      //console.log("Setting 0");
      setHorizontalScroll(buttonMargin);
    } else if (newScrollPositon < -carouselWidth2 - buttonMargin) {
      //console.log("Setting full");
      setHorizontalScroll(-carouselWidth2 - buttonMargin);
    } else {
      //console.log("Moving by ", direction * oneClickDistance, "px ||| new scroll: ", newScrollPositon);
      setHorizontalScroll(newScrollPositon);
      //controls.updatePoint("x", { offset: { x: newScrollPositon } });
      //controls.start()
    }
  };

  return (
    <div className={`bg-primary-2 relative h-[100px]`}>
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 min-w-[30px] flex items-center justify-center ${
          xPosRef.current > buttonMargin ? "opacity-20" : "opacity-100"
        }`}>
        <button className="px-5 py-5 bg-sage bg-opacity-10 rounded-xl" onClick={() => handleChangeScroll(1)}>
          <RailArrowIcon direction="left" />
        </button>
      </div>
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 min-w-[30px] flex items-center justify-center ${
          xPosRef.current < -carouselWidth - buttonMargin ? "opacity-20" : "opacity-100"
        }`}>
        <button className="px-5 py-5 bg-sage bg-opacity-10 rounded-xl" onClick={() => handleChangeScroll(-1)}>
          <RailArrowIcon direction="right" />
        </button>
      </div>
      <div className="w-full overflow-hidden absolute">
        <motion.div
          className={`flex gap-${gap}`}
          ref={carouselRef}
          animate={{ x: horizontalScroll }}
          drag="x"
          dragControls={controls}
          dragElastic={0.2}
          dragConstraints={{ left: -carouselWidth - buttonMargin, right: buttonMargin }}
          onUpdate={(latest) => {
            //console.log("UPDATING REF, latest.x = ", latest.x);
            //checkConstraints(latest.x);
            xPosRef.current = latest.x;
          }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default HorizontalRail;
