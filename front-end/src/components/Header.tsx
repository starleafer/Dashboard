"use client";
import React from "react";
import Logo from "./Logo";
import Clock from "./Clock";
import CustomToggleButton from "./atoms/CustomToggleButton";
import CustomAvatar from "./atoms/CustomAvatar";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  let pathName = "";

  switch (pathname) {
    case "/":
      pathName = "";
      break;
    case "/news/categories":
      pathName = " / News Categories";
      break;
    case "/news/categories/:id":
      pathName = " / News Categories";
      break;
    case "/news/general":
      pathName = " / General News";
      break;
    case "/news/technology  ":
      pathName = " / Technology News";
      break;
    case "/news/business":
      pathName = " / Business News";
      break;
    case "/news/sports":
      pathName = " / Sports News";
      break;
    case "/news/science":
      pathName = " / Science News";
      break;
    case "/news/health":
      pathName = " / Health News";
      break;
    case "/stocks":
      pathName = " / Stocks";
      break;
    case "/calendar":
      pathName = " / Calendar";
      break;
    case "/profile":
      pathName = " / Profile";
      break;
  }

  return (
    <header className="flex justify-between items-center px-3 pt-5 h-24 w-full">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="flex items-end justify-end text-shade dark:text-dark-text">
          <h1 className="text-3xl font-bold text-primary">{pathName}</h1>
        </span>
      </div>
      <div className="flex items-center gap-5 pr-3">
        <Clock />
        <CustomToggleButton />
        <CustomAvatar
          src={session?.user?.image || null}
          size="sm"
          onClick={() => router.push("/profile")}
        />
      </div>
    </header>
  );
};

export default Header;
