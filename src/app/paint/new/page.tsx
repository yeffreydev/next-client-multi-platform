"use client";
import { ChangeEvent, useState } from "react";

export default function NewPaintPage() {
  const [state, setState] = useState({
    dangerAlert: "",
    view: {
      width: 500,
      height: 400,
    },
  });

  const handleViewChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = parseInt(e.currentTarget.value);
    setState((prevState) => ({ ...prevState, dangerAlert: value < 50 ? "el valor minimo es 50" : "" }));
    if (value > 1000) return alert("el valor debe ser menor o igual a 1000");
    setState((prevState) => ({ ...prevState, view: { ...prevState.view, [name]: !value ? 0 : value } }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>
          <label htmlFor="">width: </label>
          <input name="width" className="bg-gray-600 w-[50px]" onChange={handleViewChange} value={state.view.width} type="text" />
        </div>
        <div>
          <label htmlFor="">height: </label>
          <input name="height" className="bg-gray-600 w-[50px]" onChange={handleViewChange} value={state.view.height} type="text" />
        </div>
        <div>
          <button className="rounded-lg px-3 py-1 bg-black">start</button>
        </div>
      </div>
      <div>
        <p className="text-red-300">{state.dangerAlert ? state.dangerAlert : ""}</p>
      </div>
      <div>
        <canvas className="bg-white" width={state.view.width} height={state.view.height}></canvas>
      </div>
    </div>
  );
}
