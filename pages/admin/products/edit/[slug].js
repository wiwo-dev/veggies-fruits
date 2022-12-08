import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Input, Select, Textarea } from "components/ui/form";
import { Button, Heading, ImgixImage, LoadingSpinner, MainContainer, Text } from "components/ui";
import useSWR from "swr";
import MainLayout from "components/layout/MainLayout";
import SingleImage from "components/imageUploader/SingleImage";
import AdminLayout from "components/layout/AdminLayout";
import axios from "axios";

import { getSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: categories, error: errorCategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);
  const { data: product, error: errorProducts } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`, fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [addedImage, setAddedImage] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

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
      setIsImageRemoved(false);
    }
  };

  const formRef = useRef();

  const AddImageForm = () => (
    <div className="flex flex-row justify-between">
      <form onSubmit={handleImageSubmit} ref={formRef} className="w-1/2">
        <Input label="Image" type="file" name="image" onChange={handleImageSubmit} />
        {/* <Button type="submit">Submit Image</Button> */}
      </form>
      {isImageLoading && (
        <div className="w-1/2 flex justify-center">
          <div className="w-[100px] h-[100px] border-2 border-primary-7 bg-gradient-to-tr from-primary-6 to-primary-9 overflow-clip rounded-md flex justify-center items-center">
            <LoadingSpinner size={50} />
          </div>
        </div>
      )}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("additional", "some value");
    //formData.append("mainPhotoUrl", selectedImage);
    formData.append("id", product.id);

    formData.append("mainPhotoUrl", addedImage ? addedImage : product.mainPhotoUrl);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);
    console.log("submited");
    console.log(object);

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`, {
        method: "PUT",
        // headers: {
        //   //"Content-Type": "multipart/form-data; boundary=-----123455XXXXX--",
        //   //"Content-Type": "application/x-www-form-urlencoded",
        // },
        body: json,
      });
      const result = await response.json();
      console.log("Success:", result);
      setIsLoading(false);
      router.push("/admin/products/list");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainContainer width="xl" className="bg-primary-1">
        <Heading>Edit product: /{router.query.slug} </Heading>
        <Text>You can edit the product here</Text>
        <hr className="mb-10"></hr>
        {!product && <p>Loading...</p>}
        {product && (
          <>
            <div className="">
              {!isImageRemoved ? (
                <div className="w-[250px] min-h-[200px]">
                  <SingleImage
                    src={addedImage ? addedImage : product.mainPhotoUrl}
                    width={250}
                    height={200}
                    showStar={false}
                    onRemove={() => {
                      setIsImageRemoved(true);
                    }}
                  />
                </div>
              ) : (
                <div className="">
                  <AddImageForm />
                </div>
              )}
            </div>
            {/* <img src={product.mainPhotoUrl} width={200} height={200} alt="image" /> */}
            <form onSubmit={handleSubmit} className="mt-5">
              <Input defaultValue={product.name} label="Name" type="text" name="name" placeholder="name" required />
              <Select defaultValue={product.categories[0].id} label="Category" name="category" required>
                <option disabled value="">
                  Choose category
                </option>
                {categories?.map((el, ind) => (
                  <option
                    value={el.id}
                    key={ind}
                    //selected={el.id === product.categories[0].id ? true : false}
                  >
                    {el.name}
                  </option>
                ))}
              </Select>
              <Input
                defaultValue={product.price}
                label="Product price"
                type="number"
                step="0.01"
                name="price"
                placeholder="Price"
                required
              />
              <Input defaultValue={product.unit} label="Unit" type="text" name="unit" placeholder="Unit" required />
              <Input defaultValue={product.stockCount} label="Stock count" type="number" name="stockCount" required />
              <Textarea defaultValue={product.description} label="Description" name="description" />
              <Button type="submit" disabled={false} loading={isLoading}>
                Submit
              </Button>
            </form>
          </>
        )}
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
