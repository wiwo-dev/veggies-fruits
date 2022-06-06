import Sidebar from "components/admin/Sidebar";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima non inventore quaerat ipsum fuga,
        delectus odit assumenda labore pariatur dolorum nam ad itaque tempore vel. Eos repudiandae corporis in!
      </p>
    </>
  );
}
