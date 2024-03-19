import { TestBed } from '@angular/core/testing';
import { CountdownService } from './countdown.service';
import { take } from 'rxjs/operators';

describe('CountdownService', () => {
  let service: CountdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a countdown string in the format of "HH:MM:SS"', (done: DoneFn) => {
    service
      .countdownToMidnight()
      .pipe(take(1))
      .subscribe({
        next: value => {
          expect(value).toMatch(/\d{2}:\d{2}:\d{2}/);
          done();
        },
        error: done.fail,
      });
  });
});
