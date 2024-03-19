import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  imports: [ThemeToggleComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {}
