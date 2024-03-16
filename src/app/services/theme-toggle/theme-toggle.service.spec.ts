import { TestBed } from '@angular/core/testing';

import { ThemeToggleService } from './theme-toggle.service';

describe('ThemeToggleService', () => {
  let service: ThemeToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize in light mode', () => {
    const isDarkMode = service.isDarkMode()();
    expect(isDarkMode).toBeFalse();
  });

  it('should change state after calling toggle', () => {
    const initialMode = service.isDarkMode()();

    service.toggleDarkMode();

    const currentMode = service.isDarkMode()();

    expect(currentMode).toBe(!initialMode);
  });
});
