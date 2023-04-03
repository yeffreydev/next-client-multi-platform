import { ReactNode } from "react";
export default function EditPaintLayout({ children }: { children: ReactNode }) {
  return <div className="w-full px-2 mx-auto md:w-10/12 lg:w-9/12">{children}</div>;
}
