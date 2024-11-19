/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ISessionProps {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface ISessionContextProps {
  session: [
    ISessionProps | null,
    Dispatch<SetStateAction<ISessionProps | null>>
  ];
  logout: () => void;
  signIn: (token: string, sessionData: ISessionProps) => void;
}

export const SessionContext = createContext<ISessionContextProps | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionData, setSessionData] = useState<ISessionProps | null>(null);

  const signIn = (token: string, currentSessionData: ISessionProps) => {
    window.localStorage.setItem("jwt", token);
    setSessionData(currentSessionData);
  };

  const logout = () => {
    window.localStorage.removeItem("jwt");
    setSessionData(null);
  };

  return (
    <SessionContext.Provider
      value={{ session: [sessionData, setSessionData], logout, signIn }}
    >
      {children}
    </SessionContext.Provider>
  );
};
