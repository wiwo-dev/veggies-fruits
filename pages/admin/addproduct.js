import axios from "axios";
import { useEffect, useState } from "react";
import { Button, MainContainer } from "components/ui";
import { Input, Select, Textarea } from "components/ui/form";
import SingleImage from "components/imageUploader/singleImage";
import MainLayout from "components/layout/MainLayout";
import useSWR from "swr";
import { useRef } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AddProduct() {
  const [addedImages, setAddedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  useEffect(() => {
    if (addedImages.length === 1) setSelectedImage(addedImages[0]);
  }, [addedImages]);

  const { data: categories, error: errorCategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("additional", "some value");
    formData.append("mainPhotoUrl", selectedImage);

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    console.log("submited");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      method: "POST",
      // headers: {
      //   //"Content-Type": "multipart/form-data; boundary=-----123455XXXXX--",
      //   //"Content-Type": "application/x-www-form-urlencoded",
      // },
      body: json,
    });
    const result = await response.json();
    console.log("Success:", result);
  };

  const formRef = useRef();

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
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
      setSelectedImage(`https://veggies-and-fruits.imgix.net${originPath}`);
    }
  };

  return (
    <>
      <MainContainer width="xl" className="bg-primary-1">
        <p className="font-body">Here you are going to add a new product to your products list.</p>
        <h1>Add one image</h1>
        <form onSubmit={handleImageSubmit} ref={formRef}>
          <Input label="Image" type="file" name="image" onChange={handleImageSubmit} />
          {/* <Button type="submit">Submit ONE</Button> */}
        </form>
        <div className="flex flex-row gap-5">
          {addedImages.map((img, index) => (
            <SingleImage
              src={`${img}?fit=fillmax&fill=solid&fill-color=F5FCF4&w=100&h=100`}
              key={index}
              onSetDefault={() => setSelectedImage(img)}
              showRemove={false}
              main={selectedImage === img}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="Name" type="text" name="name" placeholder="name" required />
          <Select label="Category" name="category" required>
            <option disabled value="">
              Choose category
            </option>
            {categories?.map((el, ind) => (
              <option value={el.id} key={ind}>
                {el.name}
              </option>
            ))}
          </Select>
          <Input label="Product price" type="number" step="0.01" name="price" placeholder="Price" required />
          <Input label="Unit" type="text" name="unit" placeholder="Unit" required />
          <Input label="Stock count" type="number" name="stockCount" defaultValue={5} required />
          <Textarea label="Description" name="description" />
          <Button type="submit" disabled={!selectedImage}>
            Submit
          </Button>
        </form>
        <br />
        <br />
        <br />
        <br />

        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </MainContainer>
    </>
  );
}

AddProduct.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
