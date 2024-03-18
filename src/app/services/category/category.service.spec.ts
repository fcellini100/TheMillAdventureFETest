import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
