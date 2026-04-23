import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faRotateRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Article as ArticleService } from '../../services/article';
import { catchError, of } from 'rxjs';

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

  articleService = inject(ArticleService);
  errorMsg = signal('');

  constructor() {
    if (this.articleService.articles() === undefined) {
      this.articleService
        .refresh()
        .pipe(
          catchError((err) => {
            console.log('err: ', err);
            this.errorMsg.set('Erreur Technique');
            return of(undefined);
          }),
        )
        .subscribe();
    }
  }
}
