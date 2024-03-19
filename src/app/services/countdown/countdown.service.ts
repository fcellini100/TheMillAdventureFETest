import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  countdownToMidnight(): Observable<string> {
    return new Observable(observer => {
      const endTime = new Date();
      endTime.setHours(24, 0, 0, 0); // next midnight

      interval(1000) // every 1 sec
        .pipe(
          startWith(0),
          map(() => {
            const now = new Date();
            const diff = endTime.getTime() - now.getTime();

            if (diff <= 0) {
              observer.complete();
            }

            const hours = this.getHrsToMidnight(diff);
            const minutes = this.getMinsToMidnight(diff);
            const seconds = this.getSecsToMidnight(diff);

            return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
          }),
          takeWhile(value => value !== '00:00:00', true) // Keep going until we hit 00:00:00
        )
        .subscribe({
          next: value => observer.next(value),
          complete: () => observer.complete(),
        });
    });
  }

  private getHrsToMidnight(diff: number): number {
    return Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }

  private getMinsToMidnight(diff: number): number {
    return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  }

  private getSecsToMidnight(diff: number): number {
    return Math.floor((diff % (1000 * 60)) / 1000);
  }

  private formatTime(time: number): string {
    return time.toString().padStart(2, '0');
  }
}
