import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Article as ArticleService } from '../../services/article';
import { catchError, delay, Observable, of, switchMap, tap } from 'rxjs';
import { Article } from '../../../types/article';
import { AsyncBtn } from '../../../widgets/async-btn/async-btn';

@Component({
  selector: 'app-list',
  imports: [RouterLink, FaIconComponent, AsyncBtn],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faCircleNotch = faCircleNotch;

  articleService = inject(ArticleService);
  errorMsg = signal('');

  selectedArticleIds = new Set<Article['id']>();

  constructor() {
    if (this.articleService.articles() === undefined) {
      of(undefined)
        .pipe(
          delay(2000),
          switchMap(() => this.articleService.refresh()),
          catchError((err) => {
            console.log('err: ', err);
            this.errorMsg.set('Erreur Technique');
            return of(undefined);
          }),
        )
        .subscribe();
    }
  }

  select(id: Article['id']) {
    if (this.selectedArticleIds.has(id)) {
      this.selectedArticleIds.delete(id);
      return;
    }
    this.selectedArticleIds.add(id);
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      switchMap(() => this.articleService.remove(this.selectedArticleIds)),
      tap(() => {
        this.selectedArticleIds.clear();
      }),
      switchMap(() => this.articleService.refresh()),
    );
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      switchMap(() => this.articleService.refresh()),
    );
  }
}
