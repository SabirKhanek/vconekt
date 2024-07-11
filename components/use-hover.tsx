"use client"
import { useState, useEffect, RefObject } from 'react';

interface HoverState {
  isHovered: boolean;
  cursorX: number;
  cursorY: number;
}

const useHover = (ref: RefObject<HTMLElement>): HoverState => {
  const [hoverState, setHoverState] = useState<HoverState>({
    isHovered: false,
    cursorX: 0,
    cursorY: 0
  });

  const handleMouseEnter = () => {
    setHoverState((prevState) => ({
      ...prevState,
      isHovered: true
    }));
  };

  const handleMouseLeave = () => {
    setHoverState((prevState) => ({
      ...prevState,
      isHovered: false
    }));
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    setHoverState((prevState) => ({
      ...prevState,
      cursorX: relativeX,
      cursorY: relativeY
    }));
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('mousemove', handleMouseMove);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [ref]);

  return hoverState;
};

export default useHover;
