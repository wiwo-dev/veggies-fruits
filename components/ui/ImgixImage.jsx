import Image from "next/image";
import React from "react";

const imgixLoader = ({ src, width, quality }) => {
  return `${src}?q=${quality || 75}&w=${width}&fit=facearea`;
};

function ImgixImage({ src, width, height, alt, ...rest }) {
  return (
    <Image
      //src={`${mainPhotoUrl}?q=100&fit=facearea&w=155&h=120`}
      src={src}
      loader={imgixLoader}
      width={width}
      height={height}
      alt={alt}
      {...rest}
    />
  );
}

export default ImgixImage;
