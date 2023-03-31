import Link from "next/link";

const TopContent = () => {
  return (
    <div className="flex justify-between bg-gray-900 p-3 rounded-lg">
      <p>you can create anything</p>
      <Link href="/paint/new" className="bg-black px-3 py-1 rounded-lg">
        Start Paint
      </Link>
    </div>
  );
};

const PaintItem = () => {
  return (
    <div className="flex  bg-gray-800 p-2 justify-between">
      <div className="flex gap-2">
        <p>pintando el paisaje</p>
        <img width={30} height={30} />
        <p>@username, @username1, @username3,...</p>
      </div>

      <Link className="bg-black text-white px-2 py-1 rounded-lg" href="/paint">
        open
      </Link>
    </div>
  );
};

const ExplorePaintItem = () => {
  return (
    <div className="flex cursor-pointer justify-between px-2">
      <p>by @username</p>
      <img width={30} height={30} />
    </div>
  );
};
const ExploreSection = () => {
  return (
    <div className="w-2/12 bg-gray-800 hidden md:block">
      <h1 className="font-bold text-teal-700 pl-2">explore more</h1>
      <div className=" flex flex-col gap-2">
        <ExplorePaintItem />
        <ExplorePaintItem />
        <ExplorePaintItem />
        <ExplorePaintItem />
        <ExplorePaintItem />
        <ExplorePaintItem />
        <ExplorePaintItem />
      </div>
    </div>
  );
};

const PaintsList = () => {
  return (
    <div className="flex w-full p-1 gap-2">
      <ExploreSection />
      <div className="flex flex-1 flex-col bg-gray-900 mt-1 p-2 gap-2">
        <PaintItem />
        <PaintItem />
        <PaintItem />
        <PaintItem />
        <PaintItem />
      </div>
    </div>
  );
};

export default function PaintPage() {
  return (
    <div>
      <TopContent />
      <PaintsList />
    </div>
  );
}
