"use client";
import React from "react";
import CustomButton from "./atoms/CustomButton";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();

  return (
    <div className="py-5 px-4">
      <ul className="flex flex-col gap-3">
        <li>
          <CustomButton variant="primary" label="Dashboard" size="large" onPress={() => router.push("/")} />
        </li>
        <li>
          <CustomButton variant="primary" label="News" size="large" onPress={() => router.push("/news")} />
        </li>
        <li>
          <CustomButton variant="primary" label="Profile" size="large" />
        </li>
        <li>
          <CustomButton variant="primary" label="Settings" size="large" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
