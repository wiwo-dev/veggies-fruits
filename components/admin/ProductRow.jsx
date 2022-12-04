import { Button, ImgixImage } from "components/ui";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ProductRow({ product }) {
  const imageWidth = 110;
  const imageHeight = 80;

  const { id, name, unit, price, mainPhotoUrl, slug } = product;

  const [isRemoving, setIsRemoving] = useState(false);
  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log("Success:", result);
      setIsRemoving(false);
    } catch (error) {
      console.log(error);
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex items-center gap-5 justify-between p-3">
      <div className="">
        <div
          className={`w-[${imageWidth}px] relative bg-gradient-to-r from-green-200 to-green-700`}
          style={{ height: `${imageHeight}px` }}>
          <ImgixImage
            src={`${mainPhotoUrl}`}
            width={imageWidth}
            height={imageHeight}
            alt={name}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between pt-1">
          <div className="flex flex-col mb-2 gap-0">
            <p className="font-body text-primary-12 text-lg">{name}</p>
            <span className="font-body text-sage text-sm lowercase">{unit}</span>
            {/* <span className="font-body self-start text-primary-11">{price.toFixed(2)}$</span> */}
          </div>
        </div>
      </div>

      <div className="xs:grow flex flex-col xs:flex-row justify-between items-center gap-5 md:gap-10">
        <div className="grow">
          <div className="mx-auto w-fit h-[36px] bg-primary-9 flex flex-row items-center justify-between rounded-full px-0 shadom-md right-[-8px] top-[-8px] transition-transform"></div>
        </div>
        <span className="font-abhaya-libre text-primary-11 text-lg"> {price.toFixed(2)}$</span>
        <div className="flex flex-col md:flex-row gap-5">
          <Link href={`/admin/products/edit/${slug}`}>
            <a>
              <EditButton />
            </a>
          </Link>
          <RemoveButton onClick={handleRemove} loading={isRemoving} />
        </div>
      </div>
    </div>
  );
}

const EditButton = ({ onClick, ...rest }) => {
  return (
    <Button
      className="min-w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
      onClick={onClick}
      {...rest}>
      <span className="text-base font-bold text-white font-abhaya-libre p-3">edit</span>
    </Button>
  );
};

const RemoveButton = ({ onClick, ...rest }) => {
  return (
    <Button
      className="min-w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
      onClick={onClick}
      {...rest}>
      <span className="text-base font-bold text-white font-abhaya-libre p-3">remove</span>
    </Button>
  );
};
