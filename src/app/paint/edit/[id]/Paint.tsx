"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PaintContext } from "./PaintContext";
import config from "@/config";
import { IPaint } from "@/types/paint";
import { getPaintById, savePaint } from "@/api/paint";
import AppContext from "@/context/AppContext";
import { FiDownload } from "react-icons/fi";
import { IPaintingData } from "./types";
import { IoIosSave } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

interface PaintProps {
  paintId: string;
}

const Paint: React.FC<PaintProps> = ({ paintId }) => {
  const { userAuth } = useContext(AppContext);
  const [paintData, setPaintData] = useState<IPaint | null>(null);
  const [painting, setPainting] = useState(false);
  const [image, setImage] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { paintSocket, currentColor, strokeWidth } = useContext(PaintContext);
  //function for start painting in canvas
  function startPainting(event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    setPainting(true);
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let x = 0,
      y = 0;
    if (event.type === "mousedown") {
      x = (event as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left;
      y = (event as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top;
    } else {
      x = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - rect.left;
      y = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - rect.top;
    }
    setMousePosition({ x, y });
  }

  const stopPainting = () => {
    setPainting(false);
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!painting) {
      return;
    }
    const canvas = event.target as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    let x = 0,
      y = 0;
    if (event.type === "mousemove") {
      x = (event as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left;
      y = (event as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top;
    } else {
      x = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - rect.left;
      y = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - rect.top;
    }
    context.beginPath();
    context.moveTo(mousePosition.x, mousePosition.y);
    context.lineTo(x, y);
    context.strokeStyle = currentColor;
    context.lineWidth = strokeWidth;
    context.stroke();
    setMousePosition({ x, y });
    paintSocket?.emit("draw", { x, y, color: currentColor, mousePosition, strokeWidth });
  };

  let canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    paintSocket?.on("draw", (data: IPaintingData) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas?.getContext("2d");
      if (!context) {
        return;
      }
      context.beginPath();
      context.moveTo(data.mousePosition.x, data.mousePosition.y);
      context.lineTo(data.x, data.y);
      context.strokeStyle = data.color;
      context.lineWidth = data.strokeWidth;
      context.stroke();
    });
  }, [paintSocket]);

  const downloadImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dataUrl = canvas.toDataURL();
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataUrl;
    link.click();
  };

  const loadImg = (urlImage: string) => {
    //load img in canvas with pngFile
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillRect(0, 0, image.width, image.height);
    const img = new Image();
    img.src = urlImage;
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  };

  const saveCurrentPaint = () => {
    console.log("clicked in save");
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.toBlob(async (blob) => {
      const imgFile = new File([blob!], paintData?.imageName!, { type: "image/png" });
      const { status } = await savePaint(userAuth.token!, imgFile);
      console.log(status);
    });
  };

  //get paint
  useEffect(() => {
    (async () => {
      const res = await getPaintById(userAuth.token!, paintId);
      setPaintData(res.data);
    })();
    //eslint-disable-next-line
  }, []);

  ///get image
  useEffect(() => {
    paintData &&
      fetch(`${config.host}${config.paintsFolder}/${paintData.imageName}`)
        .then((res) => res.blob())
        .then((blob) => {
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          img.onload = function () {
            setImage((prevState) => ({ ...prevState, width: img.naturalWidth, height: img.naturalHeight }));
            loadImg(img.src);
          };
        });
    //eslint-disable-next-line
  }, [paintData]);
  //disable scroll screen in canvas draw
  useEffect(() => {
    const canvas = canvasRef.current;
    // add event manager to canvas
    canvas?.addEventListener(
      "touchmove",
      function (event) {
        // prevent default scroll screen
        event.preventDefault();

        // now draw in canvas during scroll
        return false;
      },
      { passive: false }
    );
  }, [paintData]);

  if (!paintData) return null;

  return (
    <div>
      <canvas
        className={"m-2"}
        ref={canvasRef}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        onMouseMove={paint}
        onTouchStart={startPainting}
        onTouchEnd={stopPainting}
        onTouchMove={paint}
        width={image.width}
        height={image.height}
      />
      <div className="flex ml-2 gap-3 py-3">
        <button className="py-1 px-3 bg-gray-600 rounded-xl" onClick={downloadImg}>
          <FiDownload />
        </button>
        <button className="py-1 px-3 bg-gray-600 rounded-xl flex gap-2 items-center" onClick={saveCurrentPaint}>
          save <IoIosSave />
        </button>
      </div>
      <div className="ml-2 flex items-center gap-2">
        <span>Start New File</span>{" "}
        <Link href={"/paint/new"}>
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default Paint;
