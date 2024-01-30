import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HTMLProps, useRef } from "react";

export function AnimatedText({
  text,
  ...props
}: HTMLProps<HTMLElement> & { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    if (!containerRef.current) return;
    const lettersMap = Array.from(containerRef.current.children);
    const textChildren = text.split("").map((letter, index) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.classList.add("char");
      const currentLetter = lettersMap[index]?.innerHTML || " ";
      span.innerText = currentLetter;
      return { span, currentLetter, targetLetter: letter };
    });
    lettersMap.forEach((letter) => {
      containerRef.current?.removeChild(letter);
    });
    textChildren.forEach((letter) => {
      containerRef.current?.appendChild(letter.span);
    });
    textChildren.forEach((letter) => {
      if (letter.currentLetter === letter.targetLetter) return;
      const tl = gsap.timeline();
      tl.to(letter.span, {
        duration: Math.random() * 0.5 + 0.5,
        onUpdate: () => {
          const currentCode = letter.span.innerText.charCodeAt(0);
          const targetCode = letter.targetLetter.charCodeAt(0);
          const progressedLetter = gsap.utils.interpolate(
            currentCode,
            targetCode,
            tl.progress()
          );
          letter.span.innerText = String.fromCharCode(progressedLetter);
        },
        onComplete: () => {
          if (letter.targetLetter === " ") letter.span.innerHTML = "&nbsp;";
          else letter.span.innerText = letter.targetLetter;
        },
        ease: "power4.inOut",
      });
    });
    Array.from(containerRef.current.children).forEach((letter) => {
      if (letter.innerHTML === " ") letter.innerHTML = "&nbsp;";
    });
  }, [text]);
  return (
    <>
      <p ref={containerRef} className={`${props.className}`}></p>
    </>
  );
}
