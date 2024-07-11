'use client';
import { HTMLProps } from 'react';
import { FaPlus } from 'react-icons/fa';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  bg?: 'gradient' | 'grey';
  onClick?: () => void;
}
export function Button({
  className,
  bg,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...(props as any)}
      style={{
        background:
          bg === 'grey'
            ? '#253426A3'
            : 'linear-gradient(90.23deg, #7CB51A 48.3%, #B1E060 87.74%, #B1E060 99.82%'
      }}
      className={`flex items-center rounded-bl-xl rounded-tr-xl ${className}`}
      onClick={() => onClick && onClick()}
    >
      <span className="font-orbit border-r border-white px-3  py-2  text-white">
        {children}
      </span>
      <div className="flex items-center  justify-center px-2 text-white">
        <FaPlus />
      </div>
    </button>
  );
}
