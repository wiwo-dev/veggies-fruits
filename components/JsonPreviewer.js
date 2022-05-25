import { useState } from "react";

export default function JsonPreviewer({ data, height, children }) {
  const [visible, setVisible] = useState(false);

  const handleToggleView = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <div className="max-h-[800px] w-[800px] overflow-scroll border-2 border-black">
        <div className="min-w-[20px] min-h-[20px] bg-pink-100" onClick={handleToggleView}>
          SHOW/HIDE
        </div>
        {visible ? (
          <pre className="text-xs text-black">{JSON.stringify(data ? data : children, null, 2)}</pre>
        ) : (
          "DATA IS HIDDEN"
        )}
        {/* </div> */}
      </div>
    </>
  );
}
