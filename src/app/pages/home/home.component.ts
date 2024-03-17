import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategoryList } from '../../models/types';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, RouterLink],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  categoryData$: Observable<CategoryList> | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryData$ = this.categoryService.getAllCategories();
  }
}
