import { AppItem } from "@/ui/Header";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="w-full md:w-9/12  mx-auto mb-3">
      <h1 className="text-3xl mt-[100px] font-bold text-left my-5">Social Ecosystem for you</h1>
      <p className="mt-5 text-justify w-11/12 md:w-10/12 lg:w-6/12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi impedit voluptate temporibus! Dignissimos, aliquid quidem? Fugit incidunt doloribus saepe illo, soluta ullam aperiam autem
        maxime, ad tenetur commodi rem?
      </p>
      <div className="flex mt-5 gap-3 flex-wrap">
        <AppItem name="Paint" path="/paint" />
        <AppItem name="Paint" path="/paint" />
        <AppItem name="Paint" path="/paint" />
      </div>
      <div className="flex mt-5">
        <div className="bg-[#343434] rounded-3xl items-center flex justify-end h-[60px] w-[300px]">
          <button className="bg-[#000] rounded-3xl px-5 h-[50px]">Get Started</button>
        </div>
      </div>
      <div className="mt-[100px] ">
        <h1 className="text-2xl font-bold text-white"> Choose an App and Explore it</h1>
        <div className="flex ml-5 mt-[50px] flex-col gap-3">
          <h2 className="text-xl font-semibold">Paint App</h2>
          <p className="text-justify w-11/12 md:w-10/12 lg:w-6/12">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quia assumenda id eligendi porro incidunt similique dolor nulla eum fugiat illo, maiores dolorum facilis eveniet totam
            mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus
            reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi. mollitia reiciendis possimus commodi.
            commodi.
          </p>
          <button className="bg-gray-400 font-bold text-black w-min px-10 py-3 rounded-xl">Start </button>
        </div>
      </div>
    </div>
  );
}
