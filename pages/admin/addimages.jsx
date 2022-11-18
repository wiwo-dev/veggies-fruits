import axios from "axios";
import { useState } from "react";
import { Button, MainContainer, Text, Heading } from "components/ui";
import Navbar from "components/Navbar/Navbar";
import { Input, Select, Textarea } from "components/ui/form";
import SingleImage from "components/imageUploader/SingleImage";
import MainLayout from "components/layout/MainLayout";

export default function AddImages() {
  const [addedImages, setAddedImages] = useState([
    {
      src: "https://veggies-and-fruits.imgix.net/vegetables/tomato3.jpg",
      main: true,
    },
    {
      src: "https://veggies-and-fruits.imgix.net/fruits/banana2.jpeg",
      main: false,
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const setMainImage = (image) => {
    setAddedImages(
      addedImages.map((img) => {
        if (img.src === image.src) {
          return {
            ...img,
            main: true,
          };
        } else {
          return {
            ...img,
            main: false,
          };
        }
      })
    );
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    setIsProcessing(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, config);

    const { status } = response;
    console.log(response);
    if (status === 200 && response.data?.data?.attributes) {
      const { origin_path: originPath } = response.data.data.attributes;
      console.log("Success:", originPath);
      setIsProcessing(false);
      setAddedImages([
        ...addedImages,
        { src: `https://veggies-and-fruits.imgix.net${originPath}`, main: addedImages.length === 0 ? true : false },
      ]);
    } else {
      console.log("ERROR");
      setIsProcessing(false);
    }
  };

  return (
    <MainContainer>
      <Heading>Add Image</Heading>
      <Text>Here you are going to add a new product to your products list.</Text>

      <form onSubmit={handleImageSubmit} className="flex flex-col gap-0 max-w-[400px] mt-5">
        <Input label="Name" type="text" name="name" required />
        <Input label="Image" type="file" name="image" required />

        <Select label="Category" name="category" required>
          <option disabled value="">
            Choose category
          </option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
        </Select>

        <div className="mt-3">
          <Button type="submit" loading={isProcessing}>
            Submit
          </Button>
        </div>
      </form>
      <div className="flex flex-row gap-5 my-10">
        {addedImages.map((img, index) => (
          <SingleImage
            src={`${img?.src}?fit=fillmax&fill=solid&fill-color=F5FCF4&w=100&h=100`}
            key={index}
            main={img?.main}
            onSetDefault={() => setMainImage(img)}
            onRemove={() => setAddedImages(addedImages.filter((i) => i.src !== img.src))}
          />
          // <img src={`${img}?w=100`} alt="" key={index} />
        ))}
      </div>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </MainContainer>
  );
}

AddImages.getLayout = (page) => <MainLayout>{page}</MainLayout>;
