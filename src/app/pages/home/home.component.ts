import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from '@components/filter/filter.component';
import { CategoryCardComponent } from '@components/category-card/category-card.component';
import { CategoryList } from '@models/types';
import { CategoryService } from '@services/category/category.service';

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
  categoryData$ = new BehaviorSubject<CategoryList | undefined>(undefined);

  form: FormGroup<CategoryFilter> = new FormGroup<CategoryFilter>({
    filter: new FormControl(null),
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories(null);

    this.form.controls.filter.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(newValue => {
        this.loadCategories(newValue);
      });
  }

  loadCategories(filter: string | null): void {
    this.categoryService.getAllCategories(filter).subscribe(categories => {
      this.categoryData$.next(categories);
    });
  }
}
