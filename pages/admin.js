import JsonPreviewer from "components/JsonPreviewer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <JsonPreviewer data={session} />
        <button onClick={() => signOut()}>Sign out</button>
        <p>{session.user.role === "ADMIN" ? "✅YOU ARE AN ADMIN✅" : "🛑YOU ARE NOT AN ADMIN🛑"}</p>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
