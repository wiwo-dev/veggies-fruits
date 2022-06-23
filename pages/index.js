import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <JsonPreviewer>{session}</JsonPreviewer>
    </>
  );
}
