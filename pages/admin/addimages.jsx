import axios from "axios";
import { useState } from "react";
import Sidebar from "components/admin/Sidebar";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import Button from "components/ui/Button";
import { Input } from "components/ui/form/Input";
import { Textarea } from "components/ui/form/Textarea";
import SingleImage from "components/imageUploader/singleImage";
import MainContainer from "components/ui/MainContainer";
import { Select } from "components/ui/form/Select";

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
    formData.append("filename", `${new Date().toISOString()}`);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image`, formData, config);
    const { origin_path: originPath } = response.data.data.attributes;
    const { status } = response;
    if (status === 200) {
      console.log("Success:", originPath);
      setAddedImages([
        ...addedImages,
        { src: `https://veggies-and-fruits.imgix.net${originPath}`, main: addedImages.length === 0 ? true : false },
      ]);
    }
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <p className="font-body">Here you are going to add a new product to your products list.</p>

        <h1 className="my-2 text-xl font-display">Add one image</h1>
        <form onSubmit={handleImageSubmit} className="flex flex-col gap-0 max-w-[400px]">
          <Input label="Name" type="text" name="name" required />
          <Input label="Image" type="file" name="image" required />

          <Select label="Category" name="category" required>
            <option selected disabled value="">
              Choose category
            </option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
          </Select>

          <div className="mt-3">
            <Button type="submit">Submit</Button>
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
    </>
  );
}
