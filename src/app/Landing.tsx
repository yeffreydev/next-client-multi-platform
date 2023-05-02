import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import LoginForm from "./login/LoginForm";
import { IconType } from "react-icons/lib";

export const AppsStoreButton = ({ Icon }: { Icon: IconType; storeName: string }) => {
  return (
    <a className="border gap-3 p-2 flex justify-between items-center h-[50px] w-min border-gray-600" href="https://apps.apple.com/us/app/id1439017681" target="_blank" rel="noreferrer">
      <span>
        <Icon size={25} />
      </span>
      <div className="flex flex-col leading-3">
        <span className="text-[7px]">GET IT ON</span>
        <span className="whitespace-nowrap">App Store</span>
      </div>
    </a>
  );
};

export default function Landing() {
  return (
    <div className="lg:w-10/12 xl:w-8/12 md:w-11/12 justify-between flex mx-auto flex-col gap-2 mt-[50px]">
      <div className="flex w-full gap-2 justify-between">
        <div className="hidden border lg:flex flex-col p-2 border-gray-600 w-[500px] max-w-[500px]">
          <div className="flex flex-1"></div>
          <div className="flex w-full justify-around">
            <AppsStoreButton storeName="App Store" Icon={FaAppStoreIos} />
            <AppsStoreButton storeName="Google Play" Icon={FaGooglePlay} />
          </div>
        </div>
        <div className="flex w-11/12 max-w-[400px] mx-auto  lg:mx-0">
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:flex mx-auto w-full border border-gray-600 min-h-[100px]"></div>
    </div>
  );
}
