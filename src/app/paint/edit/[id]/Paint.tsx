"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PaintContext } from "./PaintContext";
import config from "@/config";
import { IPaint } from "@/types/paint";
import { getPaintById } from "@/api/paint";
import AppContext from "@/context/AppContext";

interface PaintProps {
  paintId: string;
}

const Paint: React.FC<PaintProps> = ({ paintId }) => {
  const { userAuth } = useContext(AppContext);
  const [color, setColor] = useState("black");
  const [paintData, setPaintData] = useState<IPaint | null>(null);
  const [painting, setPainting] = useState(false);
  const [image, setImage] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { paintSocket } = useContext(PaintContext);
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
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    setMousePosition({ x, y });
    paintSocket?.emit("draw", { x, y, color, mousePosition });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  let canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    paintSocket?.on("draw", (data: any) => {
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
      context.lineWidth = 2;
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
        className={""}
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
      <button
        onClick={() => {
          downloadImg();
        }}
      >
        Download
      </button>
      <div>
        <label htmlFor="">select color</label>
        <input onChange={handleColorChange} type="color" name="color" id="color" />
      </div>
      <div>
        <button>save file</button>
      </div>
      <div>creat new file</div>
    </div>
  );
};

export default Paint;
