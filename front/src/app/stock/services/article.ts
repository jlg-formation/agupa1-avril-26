import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { Article as ArticleType, NewArticle } from '../../types/article';

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

  add(newArticle: NewArticle): Observable<void> {
    return this.http.post<void>(url, newArticle);
  }

  remove(selectedArticleIds: Set<string>): Observable<void> {
    return this.http.delete<void>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...selectedArticleIds]),
    });
  }
}
