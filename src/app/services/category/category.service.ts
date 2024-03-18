import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category, CategoryListReponse } from '@models/types';
import { Observable, map } from 'rxjs';

const GET_CATEGORY_BY_SLUG = gql`
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

const GET_CATEGORY_LIST = gql`
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

  getCategoryBySlug(slug: string): Observable<Category> {
    const query = GET_CATEGORY_BY_SLUG;
    const variables = { slug };
    return this.apollo
      .watchQuery<CategoryListReponse>({
        query,
        variables,
      })
      .valueChanges.pipe(map(result => result.data.categories[0]));
  }
}
