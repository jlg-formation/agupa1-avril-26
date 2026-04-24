import { Component, computed, input, Input, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { catchError, delay, finalize, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  imports: [FaIconComponent],
  templateUrl: './async-btn.html',
  styleUrl: './async-btn.scss',
})
export class AsyncBtn {
  faCircleNotch = faCircleNotch;
  icon = input.required<IconDefinition>();
  disabled = input(false);
  action = input.required<Observable<void>>();
  classes = input('');
  title = input('');

  error = output<string>();

  isRunning = signal(false);
  isDisabled = computed(() => {
    return this.disabled() || this.isRunning();
  });

  run() {
    console.log('run');
    of(undefined)
      .pipe(
        tap(() => {
          this.isRunning.set(true);
          this.error.emit('');
        }),
        delay(300),
        switchMap(() => {
          return this.action();
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.error.emit('Oups... Erreur...');
          return of(undefined);
        }),
        finalize(() => {
          this.isRunning.set(false);
        }),
      )
      .subscribe();
  }
}
