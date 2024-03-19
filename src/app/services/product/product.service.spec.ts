import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
