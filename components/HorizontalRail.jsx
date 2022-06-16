import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import useWindowWidth from "./useWindowWidth";

function HorizontalRail({ children }) {
  const [horizontalScroll, setHorizontalScroll] = useState(20);
  const { windowWidth } = useWindowWidth();
  const railRef = useRef();

  const handleChangeScroll = (direction) => {
    const distance = 150;
    if (
      //horizontalScroll + direction * distance >= 0 &&
      horizontalScroll + direction * distance <
      railRef.current.getBoundingClientRect().width - 100
    ) {
      console.log("Moving by ", direction * distance, "px");
      setHorizontalScroll(horizontalScroll + direction * distance);
    } else {
      console.log("Not moving");
      console.log("horizontalScroll + direction * distance: ", horizontalScroll + direction * distance);
      console.log("Window width: ", windowWidth);
    }
  };

  return (
    <div className="h-[30px] w-full bg-primary-3 my-5 flex items-center justify-between overflow-x-hidden relative">
      <button className="px-5 min-w-[10px]" onClick={() => handleChangeScroll(1)}>
        <svg className="" width={10} height={14} viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.17838 0.155345C9.08132 0.0970904 8.97234 0.0704361 8.86314 0.0782425C8.75394 0.0860489 8.64864 0.128021 8.55855 0.199654L0.75814 6.43075C0.678433 6.49447 0.613297 6.57953 0.568308 6.67864C0.52332 6.77775 0.49982 6.88797 0.49982 6.99986C0.49982 7.11174 0.52332 7.22196 0.568308 7.32108C0.613297 7.42019 0.678433 7.50525 0.75814 7.56896L8.55855 13.8001C8.64857 13.8719 8.75392 13.914 8.86318 13.9218C8.97244 13.9295 9.08146 13.9026 9.17843 13.844C9.27539 13.7854 9.35661 13.6973 9.4133 13.5892C9.46998 13.4812 9.49996 13.3573 9.5 13.231L9.5 0.768762C9.50002 0.642383 9.47006 0.518409 9.41336 0.410278C9.35667 0.302147 9.27541 0.213985 9.17838 0.155345Z"
            fill="#203020"
          />
        </svg>
      </button>
      <div className="flex-grow w-full overflow-hidden">
        <motion.div
          ref={railRef}
          animate={{ x: horizontalScroll }}
          className="flex items-center flex-grow max-w-[500px] overflow-x-hidden"
          //style={{ transform: `translateX(${horizontalScroll}px)` }}
        >
          {children}
        </motion.div>
      </div>
      <button className="min-w-[10px] px-5" onClick={() => handleChangeScroll(-1)}>
        <svg width={9} height={14} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.321617 13.8447C0.418681 13.9029 0.527663 13.9296 0.636863 13.9218C0.746063 13.914 0.851359 13.872 0.941449 13.8003L8.74186 7.56925C8.82157 7.50553 8.8867 7.42047 8.93169 7.32136C8.97668 7.22225 9.00018 7.11203 9.00018 7.00014C9.00018 6.88826 8.97668 6.77804 8.93169 6.67892C8.8867 6.57981 8.82157 6.49475 8.74186 6.43104L0.941449 0.199939C0.851429 0.128068 0.746084 0.0859822 0.636822 0.0782376C0.527559 0.0704931 0.418542 0.0973851 0.321575 0.156002C0.224608 0.214619 0.143385 0.302726 0.0867027 0.410785C0.0300201 0.518844 3.69519e-05 0.642735 8.1503e-09 0.769045V13.2312C-1.80414e-05 13.3576 0.0299434 13.4816 0.0866369 13.5897C0.14333 13.6979 0.224593 13.786 0.321617 13.8447Z"
            fill="#203020"
          />
        </svg>
      </button>
    </div>
  );
}

export default HorizontalRail;
