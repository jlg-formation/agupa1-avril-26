import { inject, Injectable, signal } from '@angular/core';
import { Article as ArticleType } from '../../types/article';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class Article {
  articles = signal<ArticleType[] | undefined>(undefined);

  http = inject(HttpClient);

  refresh(): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      switchMap(() => {
        return this.http.get<ArticleType[]>(url);
      }),
      map((articles) => {
        this.articles.set(articles);
      }),
    );
  }
}
