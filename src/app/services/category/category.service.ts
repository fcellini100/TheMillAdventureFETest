import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CategoryList, CategoryListReponse } from '../../models/types';
import { Observable, map } from 'rxjs';

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

  getAllCategories(): Observable<CategoryList> {
    return this.apollo
      .watchQuery<CategoryListReponse>({
        query: GET_CATEGORY_LIST,
      })
      .valueChanges.pipe(map(result => result.data.getCategoryList));
  }
}
