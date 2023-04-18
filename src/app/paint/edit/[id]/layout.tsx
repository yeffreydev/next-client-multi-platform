"use client";
import { ReactNode } from "react";
import PaintState from "./PaintContext";
import ToolsBar from "./ToolsBar";
export default function EditPaintLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border-4 border-gray-600">
      <PaintState>
        {/* tools bar  */}
        <ToolsBar />
        {children}
      </PaintState>
    </div>
  );
}
