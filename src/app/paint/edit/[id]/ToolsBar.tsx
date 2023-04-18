"use client";

import { ChangeEvent, useContext } from "react";
import { PaintContext, setCurrentColor, setCurrentStrokeWidth } from "./PaintContext";
import { AiFillSetting } from "react-icons/ai";

export default function ToolsBar() {
  const { dispatch, currentColor, strokeWidth } = useContext(PaintContext);
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCurrentColor(value, dispatch);
  };
  const handleChangeStrokeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCurrentStrokeWidth(parseInt(value), dispatch);
  };
  return (
    <div className="flex h-[50px] w-full items-center bg-gray-600">
      <div className="flex flex-1 gap-3">
        <div>
          <input onChange={handleChangeColor} value={currentColor} type="color" name="paint_color" id="paint_color" />
        </div>
        <div>
          <input onChange={handleChangeStrokeWidth} value={strokeWidth} className="text-black w-[50px] font-bold text-xl" type="number" name="paint_width" id="paint_width" />
        </div>
      </div>
      <div>
        <button>
          <AiFillSetting size={30} />
        </button>
      </div>
    </div>
  );
}
