import Link from "next/link";

import { useAuth } from "@src/hooks/useAuth";

export default function Page() {
  const { signInWithEmailAndPassword } = useAuth();

  return (
    <div>
      <h1>Sign In</h1>
      <Link href="/">Back</Link>
      <button
        onClick={async () => {
          try {
            await signInWithEmailAndPassword(
              "nicavallin@gmail.com",
              "test1234",
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Hardcoded SignIn
      </button>
    </div>
  );
}
