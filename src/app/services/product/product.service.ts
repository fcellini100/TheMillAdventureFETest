import { Injectable } from '@angular/core';
import { ProductResponse } from '@models/types';
import { GET_PRODUCT_BY_SLUG } from '@queries/products';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProductBySlug(catSlug: string, slug: string): Observable<ProductResponse> {
    const query = GET_PRODUCT_BY_SLUG;
    const variables = { cat_slug: catSlug, slug };
    return this.apollo
      .watchQuery<ProductResponse>({
        query,
        variables,
      })
      .valueChanges.pipe(map(result => result.data));
  }
}
