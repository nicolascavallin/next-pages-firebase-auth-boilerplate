import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "firebase/auth";
import { onIdTokenChanged } from "@src/hooks/useAuth";

const AuthContext = createContext<{ user: User | null }>({ user: null });

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(setUser);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const user = useContext(AuthContext);

  return { ...user };
};

export { AuthContext, AuthProvider, useAuthContext };
