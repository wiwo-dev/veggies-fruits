import Sidebar from "components/admin/Sidebar";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}
