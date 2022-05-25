import { useSession, signIn, signOut } from "next-auth/react";
import JsonPreviewer from "./JsonPreviewer";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full h-10 px-4 text-white bg-primary-9">
        <p>Veggies & Fruits</p>
        {session ? (
          <>
            <div>
              Signed in as {session.user?.email} | <button onClick={() => signOut()}>Sign out</button>
            </div>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </>
  );
}
