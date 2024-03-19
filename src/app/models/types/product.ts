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
