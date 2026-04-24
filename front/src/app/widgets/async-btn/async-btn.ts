import { Component, input, Input } from '@angular/core';
import { faCircleNotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  imports: [],
  templateUrl: './async-btn.html',
  styleUrl: './async-btn.scss',
})
export class AsyncBtn {
  faCircleNotch = faCircleNotch;
  icon = input.required<IconDefinition>();
  disabled = input(false);
  action = input.required<Observable<void>>();
  classes = input('');
}
