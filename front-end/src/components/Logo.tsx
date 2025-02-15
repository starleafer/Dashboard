import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <div className={`${poppins.className} text-2xl font-bold pl-2 w-35 text-primary dark:text-dark-text`}>
      <h1 className="text-4xl font-bold">Daily Helper</h1>
    </div>
  );
};

export default Logo;
