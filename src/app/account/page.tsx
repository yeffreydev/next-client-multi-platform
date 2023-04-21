import Link from "next/link";
import LogOut from "./LogOut";
import PaintItem from "../paint/PaintItem";

export default function AccountPage() {
  return (
    <div className="flex flex-col relative gap-3 pb-5">
      <div className="flex w-11/12 relative py-3 pl-1 mx-auto gap-3">
        <div className="">
          <div className="w-[80px] border h-[80px] bg-black rounded-full"></div>
        </div>
        <div className="text-sm flex flex-1  flex-col">
          <div className="flex-1 font-normal flex justify-end">
            <LogOut />
          </div>
          <div className="flex justify-between w-full">
            <Link className="text-sm hover:text-gray-200" href={"/username"}>
              @username
            </Link>
          </div>
          <div className="">
            <button className="font-normal hover:text-gray-200">Change your profile picture</button>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 mx-auto gap-3">
        <Link href={"/"}>Home</Link>
        <Link href={"/paint"}>Paint App</Link>
      </div>
      <div className="flex flex-col w-11/12 mx-auto gap-3"></div>
      <div className="flex flex-col gap-3 w-11/12 mx-auto">
        <h1 className="text-xl">Explore More Apps</h1>
        <div className="pl-2 flex flex-col gap-3">
          <div>
            <h1 className="font-bold">Paint App</h1>
            <p className="text-gray-300 text-justify">create anything, share and explore more creativity.</p>
            <button className="px-2 rounded-xl bg-gray-800">Open</button>
          </div>
          <div>
            <h1 className="font-bold">Pixel Art App</h1>
            <p className="text-gray-300 text-justify">Ipsum magni aperiam, quidem obcaecati eius adipisci. Ut modi, ad expedita molestias, qui iure fugit autem id soluta voluptas, odit</p>
            <button className="px-2 rounded-xl bg-gray-800">Open</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-11/12 mx-auto">
        <h1 className="text-xl">Account Settings</h1>
        <div className="pl-2 flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1 items-start">
            <div>
              <label htmlFor="">username: </label>
              <input className="bg-opacity-0 bg-black text-gray-300 border-b" type="text" value={"username01"} />
            </div>
            <button className="bg-gray-600 px-2 rounded-xl">update username</button>
          </div>
          <div className="w-full flex flex-col gap-1 items-start">
            <div>
              <label htmlFor="">email: </label>
              <input className="bg-opacity-0 bg-black text-gray-300 border-b" type="text" value={"myemail@email.com"} />
            </div>
            <button className="bg-gray-600 px-2 rounded-xl">update email</button>
          </div>
          <div className="w-full">
            <div>
              <label htmlFor="">password: </label>
              <span className="bg-opacity-0 bg-black text-gray-300">**********</span>
            </div>
            <button className="bg-gray-600 px-2 rounded-xl">change password</button>
          </div>
          <h1 className="text-red-200">Danger Zone</h1>
          <div>
            <button>
              <span className="bg-red-700 text-white px-2 rounded-xl">delete account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
