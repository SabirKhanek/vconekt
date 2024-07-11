'use client';
import { motion } from 'framer-motion';
import { HTMLProps } from 'react';

export interface AnimatedListProps extends HTMLProps<HTMLUListElement> {
  items: string[];
  itemClass?: string;
  listIconSize?: number;
  textClass?: string;
}

export function AnimatedList({
  items,
  itemClass,
  listIconSize,
  textClass,
  ...props
}: AnimatedListProps) {
  return (
    <ul {...props}>
      {items.map((text, index) => (
        <motion.li
          initial={{ display: 'hidden', opacity: 0, translateY: 15 }}
          whileInView={{
            display: 'flex',
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.2, delay: 0.2 * index }
          }}
          key={index}
          className={`my-1 flex items-center gap-1 ${itemClass}`}
        >
          <img
            src="/check_li_icon.png"
            height={listIconSize || 17}
            width={listIconSize || 17}
            alt=""
          />
          <span className={`text-sm font-thin text-white ${textClass}`}>
            {text}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
