"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PaintContext } from "./PaintContext";

interface PaintProps {
  width: number;
  height: number;
}

const Paint: React.FC<PaintProps> = ({ width, height }) => {
  const [color, setColor] = useState("black");
  const [painting, setPainting] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pngFile, setPngFile] = useState<File | null>(null);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas?.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //eslint-disable-next-line
  }, []);

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

  const loadImg = () => {
    //load img in canvas with pngFile
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(pngFile!);
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  };

  const handleChangePngFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setPngFile(file);
  };

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
        width={width}
        height={height}
      />
      <button
        onClick={() => {
          downloadImg();
        }}
      >
        Download
      </button>
      <div className="upload img">
        <input onChange={handleChangePngFile} type="file" accept="png" name="img" id="img" />
        <button onClick={loadImg}>load img</button>
      </div>
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
