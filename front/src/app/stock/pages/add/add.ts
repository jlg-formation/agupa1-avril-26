import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add',
  imports: [FaIconComponent],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  faPlus = faPlus;
}
