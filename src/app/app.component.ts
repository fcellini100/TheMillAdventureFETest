import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleService } from './services/theme-toggle/theme-toggle.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private themeToggleService: ThemeToggleService) {}

  usingDarkMode = this.themeToggleService.isDarkMode();

  @HostBinding('class.dark') get mode() {
    return this.usingDarkMode();
  }

  ngOnInit(): void {
    const userUsedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (userUsedDarkMode) {
      this.themeToggleService.toggleDarkMode();
    }
  }
}
