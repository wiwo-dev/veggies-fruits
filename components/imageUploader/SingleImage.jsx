import { ImgixImage } from "components/ui";
import React from "react";
//import Image from "next/image";

function SingleImage({
  src,
  width = 100,
  height = 100,
  main = true,
  onRemove,
  showRemove = true,
  showStar = true,
  onSetDefault,
}) {
  return (
    <div className="relative">
      <div
        className={`${
          main ? "border-2 border-primary-7 " : "border-2 border-white"
        } bg-gradient-to-tr from-primary-6 to-primary-9 overflow-clip rounded-md`}>
        <img src={src} width={width} height={height} alt="image" />
      </div>
      <div className="w-fit h-[36px] bg-primary-9 flex flex-row items-center justify-between rounded-full px-0 shadom-md right-[-8px] top-[-8px] absolute transition-transform">
        {showStar && (
          <button
            className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
            onClick={onSetDefault}>
            {main ? (
              <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.8792 5L14.4756 9.80271L19.5365 9.83688L15.4622 12.8393L16.9936 17.6631L12.8792 14.716L8.76465 17.6631L10.2961 12.8393L6.22175 9.83688L11.2827 9.80271L12.8792 5Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5L13.5964 9.80271L18.6574 9.83688L14.5831 12.8393L16.1145 17.6631L12 14.716L7.8855 17.6631L9.41693 12.8393L5.3426 9.83688L10.4036 9.80271L12 5Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </button>
        )}
        {showRemove && (
          <button
            className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
            onClick={onRemove}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleImage;
