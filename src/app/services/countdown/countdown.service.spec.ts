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

  it('should emit a countdown string in the format of "Xh Ym Zs"', (done: DoneFn) => {
    service
      .countdownToMidnight()
      .pipe(take(1))
      .subscribe({
        next: value => {
          expect(value).toMatch(/\d{1,2}h \d{1,2}m \d{1,2}s/);
          done();
        },
        error: done.fail,
      });
  });
});
