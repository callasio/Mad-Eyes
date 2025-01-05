"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getUser, UserData } from "@/api/user/getUser";
import { setLazyProp } from "next/dist/server/api-utils";

interface AuthContextType {
  isSignedUp: boolean;
  user?: UserData;
  loading: boolean;
  checkSignupState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  function navigateTo(path: string) {
    startTransition(() => {
      router.push(path);
    });
  }

  useEffect(() => {
    if (status === "loading") {
      setLoadingUser(true);
    } else if (status === "authenticated") {
      checkSignupState().then(() => setLoadingUser(false));
    } else if (status === "unauthenticated") {
      navigateTo("/");
      setLoadingUser(false);
    }
  }, [status]);

  useEffect(() => {
    setLoading(isPending || loadingUser);
  }, [isPending, loadingUser]);

  const checkSignupState = async () => {
    setLoadingUser(true);
    if (session?.idToken) {
      const userResponse = await getUser(session);
      if (userResponse.success) {
        if (userResponse.user) {
          setIsSignedUp(true);
          setUser(userResponse.user);
          navigateTo("/dashboard");
        } else {
          setIsSignedUp(false);
          setUser(undefined);
          navigateTo("/signup");
        }
      } else {
        signOut();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedUp,
        checkSignupState,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
