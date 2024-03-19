import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { ProductResponse } from '@models/types';
import { ProductService } from '@services/product/product.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnDestroy {
  productData$ = new BehaviorSubject<ProductResponse | undefined>(undefined);
  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(paramMap => {
        const catSlug = paramMap.get('category-slug');
        const slug = paramMap.get('product-slug');

        if (catSlug && slug) {
          this.loadProduct(catSlug, slug);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadProduct(catSlug: string, slug: string): void {
    this.productService
      .getProductBySlug(catSlug, slug)
      .subscribe(response => this.productData$.next(response));
  }
}
