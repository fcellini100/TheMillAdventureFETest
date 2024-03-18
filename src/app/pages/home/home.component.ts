import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from '@components/filter/filter.component';
import { CategoryCardComponent } from '@components/category-card/category-card.component';
import { CategoryService } from '@services/category/category.service';
import { Category } from '@models/types';

export type CategoryFilter = {
  filter: FormControl<string | null>;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategoryCardComponent,
    RouterLink,
    ReactiveFormsModule,
    FilterComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  categoryData$ = new BehaviorSubject<Category[] | undefined>(undefined);
  loading = signal(false);

  form: FormGroup<CategoryFilter> = new FormGroup<CategoryFilter>({
    filter: new FormControl(null),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();

    this.form.controls.filter.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(newValue => {
        this.loadCategories(newValue);
      });
  }

  loadCategories(filter: string | null = null): void {
    this.loading.set(true);
    this.categoryService.getAllCategories(filter).subscribe(categories => {
      this.categoryData$.next(categories);
      this.loading.set(false);
    });
  }
}
