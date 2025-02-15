import SideMenu from "@/components/SideMenu";

export default function NewsPage() {
  return (
    <div className="flex">
      <SideMenu />
      <div className="w-full h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
        <div className="flex h-full">
          <h1>News Page</h1>
        </div>
      </div>
    </div>
  );
}
