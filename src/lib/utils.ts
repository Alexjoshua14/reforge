import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const throttle = (fn: Function, delay: number) => {
  let last = 0
  return (...args: any[]) => {
    const now = new Date().getTime()
    if (now - last < delay) return
    last = now
    return fn(...args)
  }
}