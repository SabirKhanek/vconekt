import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const FadingImage: React.FC<FadingImageProps> = ({ src, ...otherProps }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const prevSrc = useRef<string | null>(null);
  useEffect(() => {
    if (prevSrc.current !== null && prevSrc.current !== src) {
      fadeOutAndChangeSrc(src);
    }
  }, [src]);

  useEffect(() => {
    prevSrc.current = src;
  }, [src]);

  const fadeOutAndChangeSrc = (newSrc: string) => {
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (imageRef.current) {
          imageRef.current.src = newSrc;
          fadeIn();
        }
      },
    });
  };

  const fadeIn = () => {
    gsap.to(imageRef.current, {
      opacity: 1,
      duration: 0.5,
    });
  };

  return <img ref={imageRef} src={src} alt="Fading Image" {...otherProps} />;
};

export default FadingImage;
