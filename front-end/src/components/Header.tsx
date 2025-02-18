"use client";
import React from "react";
import Logo from "./Logo";
import Clock from "./Clock";
import CustomToggleButton from "./atoms/CustomToggleButton";
import CustomAvatar from "./atoms/CustomAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="flex justify-between items-center px-3 pt-5 h-24 w-full">
      <Logo />
      <div className="flex items-center gap-5 pr-3">
        <Clock />
        <CustomToggleButton />
        <CustomAvatar src={session?.user?.image || null} size="sm" onClick={() => router.push('/profile')} />
      </div>
    </header>
  );
};

export default Header;
