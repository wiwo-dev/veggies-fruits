import axios from "axios";
import JsonPreviewer from "components/JsonPreviewer";
import MainLayout from "components/layout/MainLayout";
import { Button, Heading, LoadingSpinner, MainContainer, Text } from "components/ui";
import { Input } from "components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const router = useRouter();

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user`, fetcher);

  useEffect(() => {
    if (data) {
      const { name, city, country, address, email, image, phoneNumber, role } = data;
      setUserData({ ...userData, name, city, country, address, email, image, phoneNumber, role });
      setIsLoadingUserData(false);
    }
  }, [data]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setUserData({
      ...userData,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendForm();
    console.log(userData);
  };

  const sendForm = async () => {
    const requestBody = {
      ...userData,
    };

    const config = {
      //  headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    setIsProcessing(true);
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user`, requestBody, config);
    const { status } = response;
    console.log(response);
    if (status === 200) {
      console.log("Success:");
      setIsProcessing(false);
      router.push("/profile");
    } else {
      console.log("ERROR");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <MainContainer width="xl">
        <Heading>Change your data here</Heading>
        {isLoadingUserData ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <form className="">
            <Input
              label="Name and surname"
              type="text"
              name="name"
              value={userData?.name || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Address"
              type="text"
              name="address"
              value={userData?.address || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Address 2nd. line"
              type="text"
              name="address2"
              value={userData?.address2 || ""}
              onChange={handleInputChange}
            />
            <Input label="City" type="text" name="city" value={userData?.city || ""} onChange={handleInputChange} />
            <Input
              label="Postcode"
              type="text"
              name="postcode"
              value={userData?.postcode || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Country"
              type="url"
              name="country"
              value={userData?.country || ""}
              onChange={handleInputChange}
            />
            <Input
              label="Phone"
              type="tel"
              name="phoneNumber"
              value={userData?.phoneNumber || ""}
              onChange={handleInputChange}
            />
            <Input label="Image" type="text" name="image" value={userData?.image || ""} onChange={handleInputChange} />
            <div className="flex justify-center">
              <Button type="submit" loading={isProcessing} onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>
        )}
      </MainContainer>
    </>
  );
}

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
