import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategoryList } from '../../models/types';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategoryCardComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private categoryDataSubject = new BehaviorSubject<CategoryList | undefined>(
    undefined
  );
  categoryData$ = this.categoryDataSubject.asObservable();

  searchControl = new FormControl<string | null>(null);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(newValue => {
        this.loadCategories(newValue ?? undefined);
      });
  }

  loadCategories(filter?: string): void {
    this.categoryService.getAllCategories(filter).subscribe(categories => {
      this.categoryDataSubject.next(categories);
    });
  }
}
