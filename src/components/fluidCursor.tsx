import { HTMLProps, useRef } from "react";
import { useFluidCursor } from "./fluidCursorHook";

export default function FluidCursor({
  className,
  ...props
}: HTMLProps<HTMLCanvasElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useFluidCursor({ canvasRef });
  return (
    <canvas
      ref={canvasRef}
      onError={() => {
        canvasRef.current?.style.setProperty("width", "0px");
        canvasRef.current?.style.setProperty("height", "0px");
      }}
      className={`${className} fixed w-full h-full bg-black`}
      {...props}
    ></canvas>
  );
}
