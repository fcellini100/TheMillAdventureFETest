import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.onChange = () => {};
    component.onTouched = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value to the view', () => {
    component.writeValue('test');
    expect(component.searchControl.value).toBe('test');
  });

  it('should call onChange when value changes', fakeAsync(() => {
    spyOn(component, 'onChange');
    component.ngOnInit();
    component.searchControl.setValue('new value');
    tick(500); // simulate the debounce time
    expect(component.onChange).toHaveBeenCalledWith('new value');
  }));
});
