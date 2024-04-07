
import { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/navigation";

import { auth } from "@src/utils/firebase-app";
import {
  signOut as _signOut,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";

const useAuth = () => {
  const { refresh } = useRouter();

  const callback = async (user: UserCredential | void) => {
    const idToken = await user?.user?.getIdToken();

    await fetch(`/api/auth/session?idToken=${idToken}`);

    refresh();
  };

  const signOut = () => _signOut(auth).then(callback);

  const signInWithEmailAndPassword = (email: string, password: string) => _signInWithEmailAndPassword(auth, email, password).then(callback);

  return {
    signOut,
    signInWithEmailAndPassword,
    onIdTokenChanged,
  };
};

const onIdTokenChanged = (setUser: Dispatch<SetStateAction<User | null>>) => auth.onIdTokenChanged(async (user) => {
  const idToken = await user?.getIdToken();
  await fetch(`/api/auth/session?idToken=${idToken}`);
  setUser(user);
});

export {
  useAuth,
  onIdTokenChanged,
};