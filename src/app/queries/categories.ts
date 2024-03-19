import { gql } from 'apollo-angular';

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoriesBySlug($slug: String!) {
    category(where: { slug: $slug }) {
      slug
      name
      products {
        slug
        name
        image(first: 1) {
          url
        }
      }
    }
  }
`;

export const GET_CATEGORY_PRODUCTS_BY_NAME = gql`
  query GetCategoriesBySlug($slug: String!, $name: String = "") {
    category(where: { slug: $slug }) {
      slug
      name
      products(where: { name_contains: $name }) {
        slug
        name
        image(first: 1) {
          url
        }
      }
    }
  }
`;

export const GET_CATEGORY_LIST = gql`
  query GetCategoryList($name: String = "") {
    categories(where: { name_contains: $name }) {
      slug
      name
      products {
        id
      }
    }
  }
`;
