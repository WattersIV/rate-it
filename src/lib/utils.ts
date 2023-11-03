import { RatingResponse } from '@/app/types/db';
import { RatingFormData } from '@/app/types/form';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
