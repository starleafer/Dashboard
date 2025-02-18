"use client";
import CustomAvatar from "@/components/atoms/CustomAvatar";
import CustomButton from "@/components/atoms/CustomButton";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Module from "@/components/Module";

const page = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-between mt-5 h-[500px] w-[500px] gap-4 bg-light-component drop-shadow-md dark:bg-dark-component rounded-md">
        <div className="flex items-center p-10 h-[100px] w-full gap-4">
          <h1 className="text-2xl font-bold ">Profile</h1>
        </div>
        <div className="h-[400px] w-full flex flex-col items-center justify-evenly gap-4">
          <CustomAvatar src={session?.user?.image || null} />
          <h2 className="text-xl font-bold flex flex-col items-center justify-center gap-3">
            Currently logged in as:
            <br />
            <span className="text-primary">{session?.user?.name}</span>
          </h2>
          <CustomButton variant="secondary" onPress={() => signOut()}>
            Sign out
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default page;
