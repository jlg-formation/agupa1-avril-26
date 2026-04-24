import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, of, switchMap } from 'rxjs';
import { Article } from '../../services/article';
import { NewArticle } from '../../../types/article';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncBtn } from '../../../widgets/async-btn/async-btn';

@Component({
  selector: 'app-add',
  imports: [FaIconComponent, ReactiveFormsModule, AsyncBtn],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  faPlus = faPlus;

  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  f = this.fb.nonNullable.group({
    name: ['truc', [Validators.required, Validators.maxLength(10)]],
    price: [0, Validators.required],
    qty: [1, Validators.required],
  });

  errorMsg = signal('');

  articleService = inject(Article);

  doSubmit(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const newArticle: NewArticle = this.f.getRawValue();
        return this.articleService.add(newArticle);
      }),
      switchMap(() => {
        return this.articleService.refresh();
      }),
      switchMap(() => {
        return this.router.navigate(['..'], { relativeTo: this.route });
      }),
      map(() => {}),
    );
  }
}
