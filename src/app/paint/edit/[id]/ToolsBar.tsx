"use client";

import { ChangeEvent, useContext } from "react";
import { PaintContext, setCurrentColor } from "./PaintContext";

export default function ToolsBar() {
  const { dispatch, currentColor } = useContext(PaintContext);
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCurrentColor(value, dispatch);
  };
  return (
    <div className="flex h-[50px] w-full items-center">
      <div className="flex flex-1 gap-3">
        <div>
          <input onChange={handleChangeColor} value={currentColor} type="color" name="paint_color" id="paint_color" />
        </div>
        <div>
          <input className="text-black w-[50px] font-bold text-xl" type="number" name="paint_width" id="paint_width" />
        </div>
      </div>
      <div>
        <button>config</button>
      </div>
    </div>
  );
}
