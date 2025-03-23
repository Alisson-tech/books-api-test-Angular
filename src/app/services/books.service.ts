import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  authors?: { name: string }[];
  first_publish_year?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'https://openlibrary.org/subjects/random.json?limit=10';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => 
        response.works?.map((work: any) => ({
          key: work.key,
          title: work.title,
          authors: work.authors,
          first_publish_year: work.first_publish_year
        })) || []
      )
    );
  }
}