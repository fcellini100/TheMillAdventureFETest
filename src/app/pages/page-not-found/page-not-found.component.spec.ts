import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('h1.text-6xl.font-bold')
    ).nativeElement;
    expect(titleElement.textContent).toContain('404');
  });

  it('should navigate to the home page on click', () => {
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    const href = homeLink.nativeElement.getAttribute('href');
    expect(href).toEqual('/');
  });
});
