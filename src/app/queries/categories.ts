import { gql } from 'apollo-angular';

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoriesBySlug($slug: String!) {
    categories(where: { slug: $slug }) {
      id
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
