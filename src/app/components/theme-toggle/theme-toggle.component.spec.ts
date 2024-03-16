import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeToggleService } from '../../services/theme-toggle/theme-toggle.service';
import { By } from '@angular/platform-browser';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeToggleService: ThemeToggleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [ThemeToggleService],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeToggleService = TestBed.inject(ThemeToggleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the light icon when dark mode is not active', () => {
    // Ensure dark mode is not active
    const isDarkMode = themeToggleService.isDarkMode()();
    if (isDarkMode) {
      themeToggleService.toggleDarkMode();
      fixture.detectChanges();
    }

    const iconSpan = fixture.debugElement.query(
      By.css('.material-icons-outlined')
    ).nativeElement;
    expect(iconSpan.textContent.trim()).toEqual('light_mode');
  });

  it('should show the dark icon when dark mode is active', () => {
    // Ensure dark mode is active
    const isDarkMode = themeToggleService.isDarkMode()();
    if (!isDarkMode) {
      themeToggleService.toggleDarkMode();
      fixture.detectChanges();
    }

    const iconSpan = fixture.debugElement.query(
      By.css('.material-icons-outlined')
    ).nativeElement;
    expect(iconSpan.textContent.trim()).toEqual('dark_mode');
  });
});
