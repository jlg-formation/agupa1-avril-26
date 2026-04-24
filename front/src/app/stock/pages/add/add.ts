import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, of, switchMap } from 'rxjs';
import { NewArticle } from '../../../types/article';
import { AsyncBtn } from '../../../widgets/async-btn/async-btn';
import { Article } from '../../services/article';
import { Autofocus } from '../../../widgets/autofocus';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, AsyncBtn, Autofocus],
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
      map(() => {
        return;
      }),
    );
  }
}
