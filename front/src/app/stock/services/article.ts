import { inject, Injectable, signal } from '@angular/core';
import { Article as ArticleType } from '../../types/article';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of, switchMap } from 'rxjs';

const articles: ArticleType[] = [
  { id: 'a1', name: 'Tournevis', price: 10.99, qty: 456 },
  { id: 'a2', name: 'Pelle', price: 4.99, qty: 12 },
  { id: 'a3', name: 'Marteau', price: 8.99, qty: 23 },
];

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class Article {
  articles = signal<ArticleType[] | undefined>(undefined);

  http = inject(HttpClient);

  constructor() {
    if (this.articles() === undefined) {
      this.refresh().subscribe();
    }
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      delay(2000),
      switchMap(() => {
        return this.http.get<ArticleType[]>(url);
      }),
      map((articles) => {
        this.articles.set(articles);
      }),
    );
  }
}
