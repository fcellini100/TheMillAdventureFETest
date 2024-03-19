import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Category, CategoryListReponse, CategoryReponse } from '@models/types';
import { Observable, map } from 'rxjs';
import { GET_CATEGORY_BY_SLUG, GET_CATEGORY_LIST } from '@queries/categories';

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
      .watchQuery<CategoryReponse>({
        query,
        variables,
      })
      .valueChanges.pipe(map(result => result.data.category));
  }
}
