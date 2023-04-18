import config from "@/config";
import { IPaint } from "@/types/paint";
import Link from "next/link";
import Image from "next/image";

function PaintItem({ paint }: { paint: IPaint }) {
  return (
    <div className="flex gap-1 w-full relative  bg-gray-800 p-2 items-center">
      <Image src={`${config.host}${config.paintsFolder}/${paint.imageName}`} width={30} height={30} alt={paint.name} />
      <p className="font-bold max-w-[100px] overflow-auto scrollbar-hidden  whitespace-nowrap">{paint.name}jigj jfif jsidfji</p>
      <div className="flex-1 flex gap-2 overflow-auto scrollbar-hidden">
        <p className="text-sm italic">@username</p>
        <p className="text-sm italic">@username</p>
        <p className="text-sm italic">@username</p>
        <p className="text-sm italic">@username</p>
        <p className="text-sm italic">@username</p>
      </div>
      <div className="mx-2">
        <Link className="bg-black text-white px-2 py-1 rounded-lg" href={`/paint/edit/${paint._id}`}>
          open
        </Link>
      </div>
    </div>
  );
}

export default PaintItem;
