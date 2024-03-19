import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CountdownService } from '@services/countdown/countdown.service';

const mockCountdownService = {
  countdownToMidnight: jasmine
    .createSpy('countdownToMidnight')
    .and.returnValue(of('15h 30m 25s')),
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductComponent,
        ApolloTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: CountdownService, useValue: mockCountdownService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
