"use client";
import React, { useEffect, useRef, useState } from "react";

function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("black");
  const [painting, setPainting] = useState(false);
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  //functions
  // const loadImg = (urlImage: string) => {
  //   //load img in canvas with pngFile
  //   const canvas = canvasRef.current;
  //   if (!canvas) {
  //     return;
  //   }
  //   const context = canvas.getContext("2d");
  //   if (!context) {
  //     return;
  //   }
  //   const img = new Image();
  //   img.src = URL.createObjectURL(pngFile!);
  //   img.onload = () => {
  //     context.drawImage(img, 0, 0);
  //   };
  // };
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
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let lastX: number | null, lastY: number | null, startX: number | null, startY: number | null, zoomX: number, zoomY: number, lastZoomX: number, lastZoomY: number;

    function distanceBetweenTouches(touch1: Touch, touch2: Touch): number {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    canvas?.addEventListener(
      "touchstart",
      function (event: TouchEvent) {
        if (event.touches.length === 2) {
          setIsZooming(true);
          setStartDistance(distanceBetweenTouches(event.touches[0], event.touches[1]));
          setStartX(event.touches[0].clientX);
          setStartY(event.touches[0].clientY);
          lastZoomX = event.touches[1].clientX;
          lastZoomY = event.touches[1].clientY;
        } else {
          setIsZooming(false);
          lastX = event.touches[0].clientX;
          lastY = event.touches[0].clientY;
        }
      },
      { passive: true }
    );

    canvas?.addEventListener(
      "touchmove",
      function (event: TouchEvent) {
        if (isZooming && event.touches.length === 2) {
          const currentDistance = distanceBetweenTouches(event.touches[0], event.touches[1]);
          const deltaDistance = currentDistance - (startDistance ?? 0);
          const zoomFactor = deltaDistance / 100;
          const deltaX = event.touches[1].clientX - lastZoomX;
          const deltaY = event.touches[1].clientY - lastZoomY;
          lastZoomX = event.touches[1].clientX;
          lastZoomY = event.touches[1].clientY;
          zoomX = event.touches[1].clientX - deltaX / 2;
          zoomY = event.touches[1].clientY - deltaY / 2;
          if (canvas) {
            canvas.style.transformOrigin = `${zoomX}px ${zoomY}px`;
            canvas.style.transform = `scale(${1 + zoomFactor})`;
          }
          event.preventDefault();
        } else if (!isZooming) {
          const deltaX = event.touches[0].clientX - (lastX ?? 0);
          const deltaY = event.touches[0].clientY - (lastY ?? 0);
          lastX = event.touches[0].clientX;
          lastY = event.touches[0].clientY;
          if (canvas) {
            canvas.scrollLeft -= deltaX;
            canvas.scrollTop -= deltaY;
          }
          event.preventDefault();
        }
      },
      { passive: false }
    );

    canvas?.addEventListener(
      "touchend",
      function (event: TouchEvent) {
        setIsZooming(false);
      },
      { passive: true }
    );
  }, []);
  const stopPainting = () => {
    setPainting(false);
  };

  return (
    <canvas
      onMouseDown={startPainting}
      onMouseUp={stopPainting}
      onMouseMove={paint}
      onTouchStart={startPainting}
      onTouchEnd={stopPainting}
      onTouchMove={paint}
      ref={canvasRef}
      style={{ touchAction: "none", backgroundColor: "#fff" }}
    ></canvas>
  );
}
export default Canvas;
