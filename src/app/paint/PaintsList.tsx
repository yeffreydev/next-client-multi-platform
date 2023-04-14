"use client";
import { getPaintsByUser } from "@/api/paint";
import AppContext from "@/context/AppContext";
import { IPaint } from "@/types/paint";
import { useContext, useEffect, useState } from "react";
import PaintItem from "./PaintItem";

export default function PaintList() {
  const { userAuth } = useContext(AppContext);
  const [paints, setPaints] = useState<IPaint[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getPaintsByUser(userAuth.token!);
      if (res.status !== 200) {
        return console.log("error [getPaintsByUser] ");
      }
      setPaints(res.data);
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-1 flex-col bg-gray-900 mt-1 p-2 gap-2">
      {paints.map((item, index) => {
        return <PaintItem paint={item} key={index} />;
      })}
    </div>
  );
}
