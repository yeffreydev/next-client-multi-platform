"use client";
import { ReactNode } from "react";
import PaintState from "./PaintContext";
import ToolsBar from "./ToolsBar";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
export default function EditPaintLayout({ children, params }: { children: ReactNode; params: Params }) {
  return (
    <div className="border-4 border-gray-600">
      <PaintState paintId={params.id}>
        {/* tools bar  */}
        <ToolsBar />
        {children}
      </PaintState>
    </div>
  );
}
