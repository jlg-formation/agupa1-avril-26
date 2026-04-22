import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  faAngleRight = faAngleRight;
}
