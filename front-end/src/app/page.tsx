import Image from "next/image";
import Dashboard from "./dashboard/page";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  return (
    <div className="w-full h-screen  flex flex-col bg-black-800 text-white bg-gray-900">
      <div className="flex h-full">
        <SideMenu />
        <Dashboard />
      </div>
    </div>
  );
}
