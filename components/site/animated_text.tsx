'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HTMLProps, useRef } from 'react';

export function AnimatedText({
  text,
  ...props
}: HTMLProps<HTMLElement> & { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    if (!containerRef.current) return;

    // Split the text into words
    const words = text.split(' ');

    // Clear container
    containerRef.current.innerHTML = '';

    words.forEach((word, wordIndex) => {
      const wordContainer = document.createElement('span');
      wordContainer.style.whiteSpace = 'nowrap'; // Prevent word breaking
      wordContainer.classList.add('word');
      containerRef.current!.appendChild(wordContainer);

      // Split each word into characters
      const characters = word.split('');
      characters.forEach((character, _) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.classList.add('char');
        span.innerText = character;
        wordContainer.appendChild(span);

        // Animation
        const tl = gsap.timeline();
        tl.to(span, {
          duration: Math.random() * 0.5 + 0.5,
          onUpdate: () => {
            const currentCode = span.innerText.charCodeAt(0);
            const targetCode = character.charCodeAt(0);
            const progressedLetter = gsap.utils.interpolate(
              currentCode,
              targetCode,
              tl.progress()
            );
            span.innerText = String.fromCharCode(progressedLetter);
          },
          onComplete: () => {
            if (character === ' ') span.innerHTML = '&nbsp;';
            else span.innerText = character;
          },
          ease: 'power4.inOut'
          // delay: index * 0.05, // Delay for each character
        });
      });

      // Add space between words, except for the last word
      if (wordIndex < words.length - 1) {
        containerRef.current!.appendChild(document.createTextNode(' '));
      }
    });
  }, [text]);

  return (
    <p
      ref={containerRef}
      className={`${props.className}`}
      style={{ display: 'block' }}
    ></p>
  );
}
