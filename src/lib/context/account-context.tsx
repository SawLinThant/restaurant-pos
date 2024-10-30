import { signOut, useSession } from "next-auth/react";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useMeStaff } from "../hooks/use-me-staff";
import { useRouter } from "next/router";
import { queryClient } from "../config";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

interface AccountContext {
  staff?: any;
  retrievingStaff: boolean;
  loginView: [LOGIN_VIEW, React.Dispatch<React.SetStateAction<LOGIN_VIEW>>];
  checkSession: () => void;
  refetchStaff: () => void;
  handleLogout: () => void;
  loading: boolean;
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
    children?: React.ReactNode;
}

export const AccoundProvider = ({children} : AccountProviderProps) => {
    const {status,data:session} = useSession();
    const {isLoading:retrievingStaff,refetch} = useMeStaff();
    const loginView = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN);

    const router = useRouter();
    const checkSession = useCallback(() => {
        if(status === "unauthenticated"){
            router.push("/login")
        }
    },[status,router]);

    const handleLogout = async () => {
        await signOut({
            redirect:false,
        });
        await queryClient.invalidateQueries()
        router.push('/login')
    }

    return(
        <AccountContext.Provider
        value={{
            staff: session?.user,
            retrievingStaff,
            checkSession,
            refetchStaff:refetch,
            loading:status === "loading",
            handleLogout,
            loginView
        }}
        >
            {children}
        </AccountContext.Provider>
    )
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (context === null) {
        throw new Error("useAccount must be used within a AccountProvider");
      }
      return context;
}