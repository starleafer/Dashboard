"use client";
import React from "react";
import CustomButton from "./atoms/CustomButton";
import { useRouter } from "next/navigation";
import CustomDisclosure from "./molecules/CustomDisclosure";

const SideMenu = () => {
  const router = useRouter();

  return (
    <div className="py-5 px-4">
      <ul className="flex flex-col gap-3">
        <li>
          <CustomButton
            variant="primary"
            label="Dashboard"
            size="large"
            onPress={() => router.push("/")}
          />
        </li>
        <li>
          <CustomDisclosure onPress={() => router.push("/news/categories")} />
        </li>
        <li>
          <CustomButton variant="primary" label="Stocks" size="large" />
        </li>
        <li>
          <CustomButton variant="primary" label="Calendar" size="large" />
        </li>
        <li>
          <CustomButton variant="primary" label="Profile" size="large" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
