import Link from "next/link";
import PaintItem from "../paint/PaintItem";

export default function AccountPage() {
  return (
    <div className="flex flex-col relative gap-3 mb-5">
      <div className="flex relative w-11/12 py-3 pl-3 mx-auto gap-3">
        <div>
          <div className="w-[100px] h-[100px] md:w-[170px] border md:h-[170px] bg-black rounded-full"></div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="w-full relative flex">
            <Link href={"/account"} className="ml-auto text-sm">
              settings
            </Link>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <p>@username</p>
            </div>
            <div className="flex gap-2">
              <div className="text-sm flex flex-col">
                <button className="hover:underline">followers</button>
                <span>100</span>
              </div>
              <div className="text-sm flex flex-col">
                <button className="hover:underline">following</button>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 mx-auto gap-3">
        <Link href={"/"}>Home</Link>
        <Link href={"/paint"}>Paint App</Link>
      </div>
      <div className="flex flex-col gap-3 w-11/12 mx-auto">
        <h1>My Paints</h1>
        <PaintItem paint={{ _id: "1", name: "Paint App", imageName: "6b809148-f7a9-49e4-be4e-c5b9918efd74.png", users: ["user1"], owner: "user1", public: false }} />
        <PaintItem paint={{ _id: "1", name: "Paint App", imageName: "6b809148-f7a9-49e4-be4e-c5b9918efd74.png", users: ["user1"], owner: "user1", public: false }} />
        <PaintItem paint={{ _id: "1", name: "Paint App", imageName: "6b809148-f7a9-49e4-be4e-c5b9918efd74.png", users: ["user1"], owner: "user1", public: false }} />
        <PaintItem paint={{ _id: "1", name: "Paint App", imageName: "6b809148-f7a9-49e4-be4e-c5b9918efd74.png", users: ["user1"], owner: "user1", public: false }} />
        <PaintItem paint={{ _id: "1", name: "Paint App", imageName: "6b809148-f7a9-49e4-be4e-c5b9918efd74.png", users: ["user1"], owner: "user1", public: false }} />
      </div>
      <div className="flex flex-col gap-3 w-11/12 mx-auto">
        <h1 className="text-xl">Explore More Apps</h1>
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
  );
}
