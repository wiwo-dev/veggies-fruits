import { CloseIcon } from "components/Icons/CloseIcon";
import { Button, Heading, LoadingSpinner, Text } from "components/ui";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import useWindowWidth from "components/useWindowWidth";
import { motion } from "framer-motion";

export default function UserAccountModal({ onClose }) {
  const { data: session, status } = useSession();
  const { windowWidth } = useWindowWidth();
  return (
    <motion.div
      className="min-w-[300px] bg-primary-3 shadow-sm text-center flex flex-col gap-1 justify-center items-center"
      style={{ width: windowWidth < 600 ? "100vw" : "300px" }}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}>
      <section className="p-10">
        <div className="absolute right-3 top-3 w-[30px] h-[30px]" onClick={onClose}>
          <CloseIcon />
        </div>

        {status === "loading" ? (
          <div className="absolute h-0">
            <LoadingSpinner size={30} />
          </div>
        ) : session ? (
          <>
            <Heading>{session?.token.name}</Heading>
            <Text>Session status: {status}</Text>
            <Text>{session?.token.email}</Text>
            <div className="flex justify-between items-center gap-3 mt-3 w-full">
              <Link href="/profile">
                <a>
                  <Button>Profile</Button>
                </a>
              </Link>
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          </>
        ) : (
          <>
            <Button onClick={() => signIn()}>SIGN IN</Button>
          </>
        )}

        {}
      </section>
    </motion.div>
  );
}
