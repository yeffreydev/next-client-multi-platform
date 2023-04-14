import config from "@/config";
import { IPaint } from "@/types/paint";
import Link from "next/link";
import Image from "next/image";

function PaintItem({ paint }: { paint: IPaint }) {
  return (
    <div className="flex  bg-gray-800 p-2 justify-between">
      <div className="flex gap-2">
        <p>{paint.name}</p>
        <Image src={`${config.host}${config.paintsFolder}/${paint.imageName}`} width={30} height={30} alt={paint.name} />
        <p>@username, @username1, @username3,...</p>
      </div>
      <Link className="bg-black text-white px-2 py-1 rounded-lg" href={`/paint/edit/${paint._id}`}>
        open
      </Link>
    </div>
  );
}

export default PaintItem;
