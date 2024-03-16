import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  imports: [ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {}
