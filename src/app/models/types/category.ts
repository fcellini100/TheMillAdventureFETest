import { Product } from './product';

export type Category = {
  slug: string;
  name: string;
  productus: Product[];
};
