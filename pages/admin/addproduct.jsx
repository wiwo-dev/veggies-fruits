import axios from "axios";
import { useState } from "react";
import Sidebar from "components/admin/Sidebar";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import Button from "components/ui/Button";
import { Input } from "components/ui/form/Input";
import { Textarea } from "components/ui/form/Textarea";
import SingleImage from "components/imageUploader/singleImage";

export default function AddProduct() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("additional", "some value");

    console.log("submited");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image`, {
      method: "POST",
      // headers: {
      //   //"Content-Type": "multipart/form-data; boundary=-----123455XXXXX--",
      //   //"Content-Type": "application/x-www-form-urlencoded",
      // },
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  };

  const [addedImages, setAddedImages] = useState([
    "https://veggies-and-fruits.imgix.net/vegetables/tomato3.jpg",
    "https://veggies-and-fruits.imgix.net/fruits/banana2.jpeg",
  ]);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("category", `test-category`);
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
      setAddedImages([...addedImages, `https://veggies-and-fruits.imgix.net${originPath}`]);
    }
  };

  return (
    <>
      <Navbar />

      <p className="font-body">Here you are going to add a new product to your products list.</p>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="name" placeholder="name" required />
        <Input label="Product price" type="number" name="price" placeholder="Price" required />
        <Textarea label="Description" name="description" />
        {/* <Input label="Image" type="file" name="image" /> */}
        <Input label="Image" type="file" name="images[]" multiple />

        <Button type="submit">Submit</Button>
      </form>

      <h1>Add one image</h1>
      <form onSubmit={handleImageSubmit}>
        <Input label="Image" type="file" name="image" />
        <Button type="submit">Submit ONE</Button>
      </form>
      <div className="flex flex-row gap-5">
        {addedImages.map((img, index) => (
          <SingleImage src={`${img}?fit=fillmax&fill=solid&fill-color=F5FCF4&w=100&h=100`} key={index} />
          // <img src={`${img}?w=100`} alt="" key={index} />
        ))}
      </div>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
}
