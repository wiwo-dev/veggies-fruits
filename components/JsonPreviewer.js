import { useState } from "react";

export default ({ data, height, children }) => {
  const [visible, setVisible] = useState(true);

  const handleToggleView = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <div className="w-[400px] max-h-[400px] overflow-scroll border-2 border-black" onClick={handleToggleView}>
        {/* <div className="min-w-[20px] min-h-[20px]" > */}
        {visible ? <pre className="text-xs">{JSON.stringify(data ? data : children, null, 2)}</pre> : "DATA IS HIDDEN"}
        {/* </div> */}
      </div>
    </>
  );
};
