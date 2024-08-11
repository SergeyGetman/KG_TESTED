import { Product } from '@/types/Product';

export interface Buy extends Product {
  amount: number;
}