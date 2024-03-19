import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryCardComponent } from '@components/category-card/category-card.component';
import { FilterComponent } from '@components/filter/filter.component';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { Category } from '@models/types';
import { CategoryService } from '@services/category/category.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoryCardComponent,
    RouterLink,
    ReactiveFormsModule,
    FilterComponent,
    ProductCardComponent,
  ],
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
  category$ = new BehaviorSubject<Category | undefined>(undefined);
  private unsubscribe$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(paramMap => {
        const slug = paramMap.get('category-slug');
        if (slug) {
          this.loadCategory(slug);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadCategory(slug: string): void {
    this.categoryService
      .getCategoryBySlug(slug)
      .subscribe(category => this.category$.next(category));
  }
}
