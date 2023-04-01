import { AppItem } from "@/ui/Header";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="w-full md:w-9/12  mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">this is a title landing page or feed page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi impedit voluptate temporibus! Dignissimos, aliquid quidem? Fugit incidunt doloribus saepe illo, soluta ullam aperiam autem
        maxime, ad tenetur commodi rem?
      </p>
      <h1 className="text-3xl font-bold text-center my-5">Explore Our Apps</h1>
      <div>
        <AppItem name="paint" path="/paint" />
      </div>
    </div>
  );
}
