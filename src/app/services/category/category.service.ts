import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category, CategoryListReponse } from '@models/types';
import { Observable, map } from 'rxjs';

const GET_CATEGORY_LIST = gql`
  query GetCategoriesBySlug {
    categories(where: { slug_contains: "" }) {
      id
      slug
      name
      products {
        id
      }
    }
  }
`;

/* const GET_CATEGORY = gql`
  {
    query getCategory($slug: String) {
      getCategory(where: { slug: { eq: $slug } }) {
        _id
        name
        products {
          _id
          description
          image
          name
          price
          slug
        }
        slug
      }
  }
`; */

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getAllCategories(name: string | null): Observable<Category[]> {
    const query = GET_CATEGORY_LIST;
    const variables = name ? { name } : undefined;

    return this.apollo
      .watchQuery<CategoryListReponse>({
        query,
        variables,
      })
      .valueChanges.pipe(map(result => result.data.categories));
  }

  /*   getCategoryBySlug(slug: string): any {
    return this.apollo
      .watchQuery<CategoryListReponse>({
        GET_CATEGORY,
        { slug },
      })
      .valueChanges.pipe(map(result => result.data.getCategoryList));
  } */
}
