import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('p.font-semibold.text-lg')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Angular Test');
  });

  it('should display the subtitle with the author name', () => {
    const subtitleElement = fixture.debugElement.query(
      By.css('p.text-sm.text-gray-600')
    ).nativeElement;
    expect(subtitleElement.textContent).toContain('by Fernando Cellini');
  });
});
