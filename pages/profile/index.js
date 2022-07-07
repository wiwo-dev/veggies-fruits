import axios from "axios";
import JsonPreviewer from "components/JsonPreviewer";
import MainLayout from "components/layout/MainLayout";
import { Button, Heading, LoadingSpinner, MainContainer, Text } from "components/ui";
import { Input } from "components/ui/form";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  useEffect(() => {
    const getUsersDataFromApi = async () => {
      setIsLoadingUserData(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
        console.log(response.data);
        const { name, city, country, address, email, image, phoneNumber, role } = response.data;
        setUserData({ ...userData, name, city, country, address, email, image, phoneNumber, role });
        setIsLoadingUserData(false);
      } catch (error) {
        console.log(error);
        setIsLoadingUserData(false);
      }
    };
    getUsersDataFromApi();
  }, []);

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
      //router.push("/cart/pay");
    } else {
      console.log("ERROR");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <JsonPreviewer>{session}</JsonPreviewer>

      <MainContainer width="xl">
        <Heading>Profile</Heading>
        <Text>Session status: {status}</Text>
        <Text>Name: {session?.token.name}</Text>
        <Text>Email: {session?.token.email}</Text>
        <Text>Role: {userData?.role}</Text>

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
