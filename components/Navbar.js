import { useSession, signIn, signOut } from "next-auth/react";

export default function () {
  const { data: session } = useSession();
  return (
    <>
      <div className="w-full h-10 bg-primary-9 flex flex-row justify-between items-center text-white px-4">
        <p>Veggies & Fruits</p>
        {session ? (
          <>
            <div>
              Signed in as {session.user.email} | <button onClick={() => signOut()}>Sign out</button>
            </div>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </>
  );
}
