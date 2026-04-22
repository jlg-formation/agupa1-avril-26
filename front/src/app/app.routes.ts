import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Legal } from './pages/legal/legal';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'legal', component: Legal },
];
