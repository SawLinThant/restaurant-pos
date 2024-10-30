import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AccoundProvider } from "~/lib/context/account-context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}:any) => {
  const getLayout = Component.getLayout ?? ((page:any) => page)
  return (
    <SessionProvider session={session}>
      <AccoundProvider>
      <div className={GeistSans.className}>
     {getLayout(<Component {...pageProps} />)}   
      </div>
      </AccoundProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
