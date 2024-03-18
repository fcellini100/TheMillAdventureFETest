import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CategoryList, CategoryListReponse } from '@models/types';
import { Observable, map } from 'rxjs';

const GET_FILTERED_CATEGORY_LIST = gql`
  query getCategoryList($name: String) {
    getCategoryList(where: { name: { match: $name } }) {
      items {
        _id
        name
        slug
        products {
          _id
        }
      }
      total
    }
  }
`;

const GET_CATEGORY_LIST = gql`
  {
    getCategoryList {
      items {
        _id
        name
        slug
        products {
          _id
        }
      }
      total
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getAllCategories(name: string | null): Observable<CategoryList> {
    const query = name ? GET_FILTERED_CATEGORY_LIST : GET_CATEGORY_LIST;
    const variables = name ? { name } : undefined;

    return this.apollo
      .watchQuery<CategoryListReponse>({
        query,
        variables,
      })
      .valueChanges.pipe(map(result => result.data.getCategoryList));
  }
}
