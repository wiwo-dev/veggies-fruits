import AdminMenu from "components/admin/AdminMenu";
import JsonPreviewer from "components/JsonPreviewer";
import AdminLayout from "components/layout/MainLayout copy";
import Navbar from "components/Navbar/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-[32px]">
        <p>That's your admin Dashboard.</p>
      </main>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
