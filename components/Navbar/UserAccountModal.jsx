import { Heading, Text } from "components/ui";
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserAccountModal({ onClose }) {
  const { data: session } = useSession();
  return (
    <div className="min-w-[100px] bg-primary-3 rounded-xl p-2 border-2 border-primary-6">
      <div className="absolute right-3 top-3" onClick={onClose}>
        X
      </div>
      <Heading>USER MODAL</Heading>
      <Text>{session?.user?.email}</Text>
      {session ? (
        <>
          <div className="flex items-center">
            <button onClick={() => signOut()}>SIGN OUT</button>
          </div>
        </>
      ) : (
        <button onClick={() => signIn()}>SIGN IN</button>
      )}
    </div>
  );
}
