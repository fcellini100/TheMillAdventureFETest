import { Product } from './product';

export type Category = {
  _id: string;
  slug: string;
  name: string;
  products: Product[];
};

export type CategoryListReponse = {
  categories: Category[];
};
