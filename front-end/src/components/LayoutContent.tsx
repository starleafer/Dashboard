"use client";
import { useSession } from "next-auth/react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Login from "./Login";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="w-full h-screen flex flex-col bg-light-gradient dark:bg-dark-gradient text-shade dark:text-dark-text">
      {session ? (
        <>
          <Header />
          <div className="flex h-full">
            <SideMenu />
            <main className="flex-1">{children}</main>
          </div>
        </>
      ) : (
        <div className="flex h-full justify-center items-center">
          <Login />
        </div>
      )}
    </div>
  );
} 