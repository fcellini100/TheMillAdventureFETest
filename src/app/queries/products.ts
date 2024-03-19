import { gql } from 'apollo-angular';

export const GET_PRODUCT_BY_SLUG = gql`
  query GetCategoriesBySlug($slug: String!) {
    categories(where: { slug: $slug }) {
      id
      slug
      name
      products {
        slug
        name
      }
    }
  }
`;
