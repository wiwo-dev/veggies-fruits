import { Button, Heading, Text } from "components/ui";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserAccountModal({ onClose }) {
  const { data: session, status } = useSession();
  return (
    <div className="min-w-[100px] bg-primary-3 rounded-xl p-10 border-2 border-primary-6">
      <div className="absolute right-3 top-3" onClick={onClose}>
        X
      </div>

      <Heading>Profile</Heading>
      <Text>Session status: {status}</Text>
      <Text>Name: {session?.token.name}</Text>
      <Text>Email: {session?.token.email}</Text>

      {session ? (
        <>
          <div className="flex justify-between items-center gap-3 mt-2 w-full">
            <Link href="/profile">
              <a>
                <Button>PROFILE</Button>
              </a>
            </Link>
            <Button onClick={() => signOut()}>SIGN OUT</Button>
          </div>
        </>
      ) : (
        <button onClick={() => signIn()}>SIGN IN</button>
      )}
    </div>
  );
}
