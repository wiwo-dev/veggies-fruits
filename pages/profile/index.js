import axios from "axios";
import JsonPreviewer from "components/JsonPreviewer";
import MainLayout from "components/layout/MainLayout";
import ProfileMenu from "components/profile/ProfileMenu";
import { BoxSection, Button, Heading, LoadingSpinner, MainContainer, Text } from "components/ui";
import { Input } from "components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <MainContainer width="xl">
        <ProfileMenu />
        <BoxSection>
          <div className="flex flex-col items-center pb-7">
            <Heading>{session?.token.name}</Heading>
            <Text>{session?.token.email}</Text>
          </div>
        </BoxSection>
      </MainContainer>
    </>
  );
}

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
