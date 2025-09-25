
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
import StoreProvider from "@/redux/provider";
import CurrentUser from "@/components/auth/UserHydration";

export const metadata = {
  title: "Splitr",
  description: "The smartest way to split expenses with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/logo-s.png" sizes="any" />
      </head>
      <body >
        <StoreProvider>
          <CurrentUser>
            <Header />
            <main className="min-h-screen">
              <Toaster richColors />

              {children}
            </main>
            </CurrentUser>
            </StoreProvider>
      </body>
    </html>
  );
}
