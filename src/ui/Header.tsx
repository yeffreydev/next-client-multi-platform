"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { IoApps } from "react-icons/io5";

//==========props
interface HeaderProps {
  children: ReactNode;
}

interface AppItemProps {
  path: string;
  name: string;
}

//===========components

const AuthButtons = ({ handleApps }: { handleApps: () => void }) => {
  return (
    <div className="flex gap-3">
      <button onClick={handleApps}>
        <IoApps className="text-white w-[35px] h-[35px]" />
      </button>
      <Link href={"/account"} className="">
        <div className="bg-gray-300 w-[35px] rounded-full h-[35px]"></div>
      </Link>
    </div>
  );
};
const LoginLink = () => {
  return <Link href={"/login"}>Login</Link>;
};

export const AppItem = ({ name, path }: AppItemProps) => {
  return (
    <Link className="px-2 m-0 py-1 bg-black rounded-lg" href={path}>
      {name}
    </Link>
  );
};

const AppList = () => {
  return (
    <div className="absolute p-2 gap-2 flex justify-center content-start items-center flex-wrap w-[200px] h-[300px] bg-red-300 top-[60px] right-0">
      <AppItem name="Home" path="/" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
      <AppItem name="Paint" path="/paint" />
    </div>
  );
};
export default function Header({ children }: HeaderProps) {
  const { isLoggedIn } = useAuth({ redirect: false });
  const [viewApps, setViewApps] = useState(false);
  const handleViewApps = () => {
    setViewApps(!viewApps);
  };
  return (
    <header className="flex relative justify-between items-center h-[60px] mx-auto md:w-10/12 lg:w-9/12">
      <div>{children}</div>
      <nav>
        <ul>{!isLoggedIn ? <LoginLink /> : <AuthButtons handleApps={handleViewApps} />}</ul>
      </nav>
      {viewApps && <AppList />}
    </header>
  );
}
