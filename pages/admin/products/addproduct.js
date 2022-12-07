import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ImgixImage, LoadingSpinner, MainContainer } from "components/ui";
import { Input, Select, Textarea } from "components/ui/form";
import SingleImage from "components/imageUploader/SingleImage";
import MainLayout from "components/layout/MainLayout";
import useSWR from "swr";
import { useRef } from "react";
import AdminLayout from "components/layout/AdminLayout";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [addedImage, setAddedImage] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: categories, error: errorCategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);
  const router = useRouter();

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setIsImageLoading(true);
    const formData = new FormData(formRef.current);
    formData.append("folder", `product-images`);
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
      setIsImageLoading(false);
      setAddedImage(`https://veggies-and-fruits.imgix.net${originPath}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    //formData.append("additional", "some value");
    formData.append("mainPhotoUrl", addedImage);

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    console.log("submited");
    try {
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
      router.push("/admin/products/list");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const formRef = useRef();

  return (
    <>
      <MainContainer width="xl" className="bg-primary-1">
        <p className="font-body">Here you are going to add a new product to your products list.</p>
        <h1>Add one image</h1>
        <div className="flex flex-row justify-between">
          <form onSubmit={handleImageSubmit} ref={formRef} className="w-1/2">
            <Input label="Image" type="file" name="image" onChange={handleImageSubmit} />
            {/* <Button type="submit">Submit Image</Button> */}
          </form>
          <div className="w-1/2 flex justify-center">
            <div className="w-[100px] h-[100px] border-2 border-primary-7 bg-gradient-to-tr from-primary-6 to-primary-9 overflow-clip rounded-md flex justify-center items-center">
              {addedImage && <ImgixImage src={addedImage} width="200" height="200" alt="image" />}
              {isImageLoading && <LoadingSpinner size={50} />}
            </div>
          </div>
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
          <Button type="submit" disabled={!addedImage} loading={isLoading}>
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

Page.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session?.dbUser.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
