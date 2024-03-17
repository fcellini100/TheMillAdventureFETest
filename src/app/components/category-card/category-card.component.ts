import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  @Input() name: string | undefined;
  @Input() productCount: number | undefined;
}
