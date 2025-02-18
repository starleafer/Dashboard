"use client";
import React from "react";
import Module from "./Module";
import CustomInput from "./atoms/CustomInput";
import CustomButton from "./atoms/CustomButton";
import Logo from "./Logo";
import { useSession, signIn, signOut } from "next-auth/react";
import CustomAvatar from "./atoms/CustomAvatar";

const Login = () => {
  const { data: session } = useSession();


  return (
    <div className="flex w-96 h-[500px] rounded-md drop-shadow-xl drop-shadow-gray-500 flex-col items-center justify-evenly bg-light-component dark:bg-dark-component">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-4">   
        {
            session ? (
                <div className="flex gap-2 flex-col items-center justify-center">
                    <CustomAvatar src={session?.user?.image || null} />
                    <h3 className="text-2xl font-bold text-primary">Welcome, {session?.user?.name}</h3>
                    <CustomButton variant="secondary" onPress={() => signOut()}>Logout</CustomButton>
                </div>
            ) : (
                <div className="flex gap-4 flex-col items-center justify-center">
                    <h3 className="text-1xl font-bold text-primary">Please login to continue</h3>
                    <CustomButton 
                        variant="secondary" 
                        onPress={() => signIn('google')}
                    >
                        Sign in with Google
                    </CustomButton>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Login;
