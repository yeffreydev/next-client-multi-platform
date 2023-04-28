"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { LegacyRef, MutableRefObject, ReactNode, useRef, useState } from "react";
import { IoApps } from "react-icons/io5";
import { appDataConfig } from "@/config/data";
//==========data
const appListData: AppItemProps[] = [
  { name: "Home", path: "/" },
  { name: "Paint", path: appDataConfig.appsRoutes.paint },
  { name: "Paint", path: appDataConfig.appsRoutes.paint },
  { name: "Paint", path: appDataConfig.appsRoutes.paint },
  { name: "Paint", path: appDataConfig.appsRoutes.paint },
  { name: "Paint", path: appDataConfig.appsRoutes.paint },
];

//==========props
interface HeaderProps {
  children: ReactNode;
}

interface AppItemProps {
  path: string;
  name: string;
}

interface AuthButtonsProps {
  handleApps: () => void;
  appsButtonRef: LegacyRef<HTMLButtonElement> | undefined;
}

//===========components

const AuthButtons = ({ handleApps, appsButtonRef }: AuthButtonsProps) => {
  return (
    <div className="flex gap-3">
      <button ref={appsButtonRef} onClick={handleApps}>
        <IoApps className="text-white w-[35px] h-[35px]" />
      </button>
      <Link href={"/username"} className="">
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
    <Link className="px-2 m-0 py-1 bg-gray-800 rounded-lg" href={path}>
      {name}
    </Link>
  );
};

const AppList = ({ listRef }: { listRef: MutableRefObject<HTMLDivElement | null> }) => {
  return (
    <div ref={listRef} className="absolute z-10 p-2 gap-2 flex justify-center content-start items-center flex-wrap w-[200px] h-[300px] bg-black top-[60px] right-0">
      {appListData.map((item, index) => (
        <AppItem key={index} name={item.name} path={item.path} />
      ))}
    </div>
  );
};

// ======== Main Header component
export default function Header({ children }: HeaderProps) {
  const { isLoggedIn } = useAuth({ redirect: false });
  const [viewApps, setViewApps] = useState(false);
  const appListRef = useRef<HTMLDivElement | null>(null);
  const appsButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleViewApps = () => {
    setViewApps(!viewApps);
  };
  const handleClickOutsideAppList = (e: MouseEvent) => {
    if (appListRef) {
      const appListContainEvent = appListRef.current?.contains(e.target as Node);
      const appsButtonContainEvent = appsButtonRef.current?.contains(e.target as Node);
      !appsButtonContainEvent && !appListContainEvent && setViewApps(false);
    }
  };
  viewApps && document.addEventListener("mousedown", handleClickOutsideAppList);
  return (
    <header className="flex relative justify-between items-center h-[60px] mx-auto md:w-10/12 lg:w-9/12">
      <div>{children}</div>
      <nav>
        <ul>{!isLoggedIn ? <LoginLink /> : <AuthButtons appsButtonRef={appsButtonRef} handleApps={handleViewApps} />}</ul>
      </nav>
      {viewApps && <AppList listRef={appListRef} />}
    </header>
  );
}
