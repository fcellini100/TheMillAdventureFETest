import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { ThemeToggleService } from '@services/theme-toggle/theme-toggle.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  constructor(private themeToggleService: ThemeToggleService) {}

  currentMode: Signal<boolean> = this.themeToggleService.isDarkMode();

  changeTheme(): void {
    this.themeToggleService.toggleDarkMode();
    localStorage.setItem('darkMode', this.currentMode().toString());
  }
}
