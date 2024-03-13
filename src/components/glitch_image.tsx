import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HTMLProps, useEffect, useRef } from "react";

export function GlitchImage({
  src,
  width,
  ...props
}: HTMLProps<HTMLCanvasElement> & { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log(canvasRef.current.parentElement?.clientWidth);
    width = canvasRef.current.parentElement!.clientWidth;
  }, [canvasRef.current]);

  useGSAP(() => {
    if (!canvasRef.current) return;
    const displayedCanvas = canvasRef.current;
    const dis_ctx = displayedCanvas.getContext("2d");
    if (!dis_ctx) return;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = displayedCanvas.width;
    tempCanvas.height = displayedCanvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.width = +(width || 465);
    img.height = +(width || 465) * 0.65;
    img.style.objectFit = "cover";

    img.onload = () => {
      tempCtx.drawImage(img, 0, 0);
      const oldImageData = dis_ctx.getImageData(
        0,
        0,
        displayedCanvas.width,
        displayedCanvas.height
      );
      const newImageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const oldData = oldImageData.data;
      const newData = newImageData.data;
      const tl = gsap.timeline({});
      tl.to(
        {},
        {
          duration: 0.5,
          onUpdate: () => {
            const shiftData = oldData.map((v, i) => {
              if (i % 4 === 3) return newData[i];

              return gsap.utils.interpolate(v, newData[i], tl.progress());
            });
            dis_ctx.putImageData(
              new ImageData(shiftData, oldImageData.width, oldImageData.height),
              0,
              0
            );
          },
        }
      );
    };
  }, [src]);

  return (
    <canvas
      style={{ width: width, height: `${(width as number) * 0.65}px` }}
      {...props}
      ref={canvasRef}
    ></canvas>
  );
}
