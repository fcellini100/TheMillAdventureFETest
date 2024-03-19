import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryCardComponent } from '@components/category-card/category-card.component';
import { FilterComponent } from '@components/filter/filter.component';
import { ProductCardComponent } from '@components/product-card/product-card.component';
import { Category, FilterForm } from '@models/types';
import { CategoryService } from '@services/category/category.service';
import { BehaviorSubject, Subject, skip, takeUntil } from 'rxjs';

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
  categorySlug: string;
  loading = signal(false);

  private unsubscribe$ = new Subject<void>();

  form: FormGroup<FilterForm> = new FormGroup<FilterForm>({
    filter: new FormControl(null),
  });

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
          this.categorySlug = slug;
          this.loadCategory(slug);
          this.setUpFilter();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadCategory(slug: string): void {
    this.loading.set(true);
    this.categoryService.getCategoryBySlug(slug).subscribe(category => {
      this.category$.next(category);
      this.loading.set(false);
    });
  }

  private filterProducts(name: string | null = null): void {
    this.loading.set(true);
    this.categoryService
      .getCategoryProductsByName(this.categorySlug, name)
      .subscribe(category => {
        this.category$.next(category);
        this.loading.set(false);
      });
  }

  private setUpFilter(): void {
    if (this.categorySlug) {
      this.form.controls.filter.valueChanges
        .pipe(skip(1))
        .subscribe(newValue => {
          this.filterProducts(newValue);
        });
    }
  }
}
