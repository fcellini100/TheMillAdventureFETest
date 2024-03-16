import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeToggleService {
  private darkMode = signal<boolean>(false);

  toggleDarkMode(): void {
    const newState = !this.darkMode();
    this.darkMode.set(newState);
  }

  isDarkMode(): Signal<boolean> {
    return computed(() => this.darkMode());
  }
}
