import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterComponent),
      multi: true,
    },
  ],
})
export class FilterComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  searchControl = new FormControl<string | null>(null);
  private unsubscribe$ = new Subject<void>();

  onChange: (value: string | null) => void;
  onTouched: () => void;

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  writeValue(value: string | null): void {
    this.searchControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }
}
