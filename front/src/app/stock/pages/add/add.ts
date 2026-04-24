import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { of, switchMap } from 'rxjs';
import { Article } from '../../services/article';
import { NewArticle } from '../../../types/article';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [FaIconComponent, ReactiveFormsModule],
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

  articleService = inject(Article);

  submit() {
    of(undefined)
      .pipe(
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
      )
      .subscribe();
  }
}
