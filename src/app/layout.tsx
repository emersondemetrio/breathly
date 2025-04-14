import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Provider } from 'jotai';

export const metadata: Metadata = {
  title: "Breathly",
  description: "A breathing exercise app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const RootLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
