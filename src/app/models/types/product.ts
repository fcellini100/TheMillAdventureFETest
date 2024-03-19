import { Category } from './category';

export type Product = {
  slug: string;
  name: string;
  image: ProductImage[];
  description: string;
  price: number;
};

export type ProductImage = {
  url: string;
};

export type ProductResponse = {
  category: Partial<Category>;
  product: Product;
};
