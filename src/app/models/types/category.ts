import { Product } from './product';

export type Category = {
  _id: string;
  slug: string;
  name: string;
  products: Product[];
};

export type CategoryList = {
  items: Partial<Category[]>;
  total: number;
};

export type CategoryListReponse = {
  getCategoryList: CategoryList;
};
