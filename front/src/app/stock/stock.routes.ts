import { Routes } from '@angular/router';
import { Add } from './pages/add/add';
import { List } from './pages/list/list';

export const stockRoutes: Routes = [
  { path: '', component: List },
  { path: 'add', component: Add },
];
