import { Product } from './product';

export type Category = {
  _id: string;
  slug: string;
  name: string;
  products: Partial<Product[]>;
};

export type CategoryReponse = {
  category: Category;
};

export type CategoryListReponse = {
  categories: Category[];
};
