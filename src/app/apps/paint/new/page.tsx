"use client";
import { createNewPaint } from "@/api/paint";
import { appDataConfig } from "@/config/data";
import AppContext from "@/context/AppContext";
import { ChangeEvent, FormEvent, useRef, useContext, useState } from "react";

export default function NewPaintPage() {
  const { userAuth } = useContext(AppContext);
  const [state, setState] = useState({
    dangerAlert: "",
    name: "",
    view: {
      width: 400,
      height: 400,
    },
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleViewChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = parseInt(e.currentTarget.value);
    setState((prevState) => ({ ...prevState, dangerAlert: value < 50 ? "el valor minimo es 50" : "" }));
    if (value > 1000) return alert("el valor debe ser menor o igual a 1000");
    setState((prevState) => ({ ...prevState, view: { ...prevState.view, [name]: !value ? 0 : value } }));
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setState((prevState) => ({ ...prevState, name: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.name.trim()) return alert("name is required");
    if (state.view.width < 50) return alert("el valor minimo es 50");
    if (state.view.height < 50) return alert("el valor minimo es 50");
    if (state.view.width > 1000) return alert("el valor debe ser menor o igual a 1000");
    if (state.view.height > 1000) return alert("el valor debe ser menor o igual a 1000");
    if (state.dangerAlert) return alert(state.dangerAlert);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = state.view.width;
      canvas.height = state.view.height;
      var ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      const dataUrl = canvas.toDataURL("image/png");
      fetch(dataUrl)
        .then((res) => res.blob())
        .then(async (blob) => {
          const file = new File([blob], "image.png", { type: "image/png" });
          const { status, data } = await createNewPaint(state.name, file, userAuth.token);
          if (status === 200) {
            window.location.href = `${appDataConfig.appsRoutes.paint}/edit/${data._id}`;
          }
        });
    }
  };

  return (
    <div className="flex mt-3 flex-col gap-2 mx-auto w-full px-2 md:w-9/12 lg:w-8/12 ">
      <form className="flex items-center gap-2 p-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input autoComplete="off" name="name" className="bg-gray-600 w-[50px]" value={state.name} onChange={handleChangeName} type="text" />
        </div>
        <div>
          <label htmlFor="">width: </label>
          <input name="width" className="bg-gray-600 w-[50px]" onChange={handleViewChange} value={state.view.width} type="text" />
        </div>
        <div>
          <label htmlFor="">height: </label>
          <input name="height" className="bg-gray-600 w-[50px]" onChange={handleViewChange} value={state.view.height} type="text" />
        </div>
        <div>
          <button type="submit" className="rounded-lg px-3 py-1 bg-slate-800">
            start
          </button>
        </div>
      </form>
      <div className="p-2">
        <p className="text-red-300">{state.dangerAlert ? state.dangerAlert : ""}</p>
      </div>
      <div className="p-2">
        <canvas ref={canvasRef} className="bg-white" width={state.view.width} height={state.view.height}></canvas>
      </div>
    </div>
  );
}
