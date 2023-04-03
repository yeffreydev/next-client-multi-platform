"use client";
import { ReactNode } from "react";
import PaintState from "./PaintContext";
export default function EditPaintLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <PaintState>
        {/* tools bar  */}
        <div className="flex">
          <button>width</button>
        </div>
        {children}
      </PaintState>
    </div>
  );
}
