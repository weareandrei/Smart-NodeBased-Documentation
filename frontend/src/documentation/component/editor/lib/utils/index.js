import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export * from './cssVar';
export * from './getRenderContainer';
export * from './isCustomNodeSelected';
export * from './isTextSelected';
