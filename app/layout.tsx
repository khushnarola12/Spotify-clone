import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import Sidebar from "./components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "./components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <ToasterProvider />
          <UserProvider>
              <ModalProvider />
              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
