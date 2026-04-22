import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faRotateRight, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const articles = [
  { id: 'a1', name: 'Tournevis', price: 10.99, qty: 456 },
  { id: 'a2', name: 'Pelle', price: 4.99, qty: 12 },
  { id: 'a3', name: 'Marteau', price: 8.99, qty: 23 },
];

@Component({
  selector: 'app-list',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashCan = faTrashCan;

  articles = articles;
}
