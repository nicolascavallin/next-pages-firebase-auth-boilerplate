"use client";

import Link from "next/link";

import { AuthProvider, useAuthContext } from "@src/hooks/AuthContext";

const SessionData = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user ? (
        <div>
          <p>Signed in</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <Link href="/signin">Sign in</Link>
        </div>
      )}
      <button
        onClick={() =>
          fetch("/api/test")
            .then((res) => res.json())
            .then(console.log)
            .catch(console.error)
        }
      >
        Test Logged Endpoint
      </button>
      <p>Check response in console</p>
    </div>
  );
};

export const SessionComponent = () => {
  return (
    <AuthProvider>
      <SessionData />
    </AuthProvider>
  );
};
