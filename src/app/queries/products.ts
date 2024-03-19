import { gql } from 'apollo-angular';

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($cat_slug: String!, $slug: String!) {
    category(where: { slug: $cat_slug }) {
      slug
      name
      products(first: 3, where: { slug_not: $slug }) {
        name
        slug
        image(first: 1) {
          url
        }
      }
    }
    product(where: { slug: $slug }) {
      slug
      name
      price
      description
      image(first: 1) {
        url
      }
    }
  }
`;
