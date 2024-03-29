import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/HOC/theme-provider";
import Provider from "@/components/HOC/Providers";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import { getUser } from "@/lib/action/getUserData";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unity Aid Hub",
  description: "A fund raiser app for need  one",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getUser();
  console.log("user from layout", user)

  return (
    <html lang="en">
      <body className={`${inter.className}  dark:bg-zinc-950 p-0 m-0`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
          {children}
          <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
function getAllUse(accessToken: string | undefined) {
  throw new Error("Function not implemented.");
}

