import { Component, OnInit } from '@angular/core';
import { BooksService, Book } from '../../services/books.service';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  data: Book[] = [];

  constructor(private booksService: BooksService) {} 

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getBooks().subscribe(
      (books) => {
        this.data = books;
        console.log(this.data);
      },
      (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    );
  }

  formatAuthors(authors?: { name: string }[]): string {
    if (!authors || authors.length === 0) {
      return 'Autor desconhecido';
    }
    return authors.map(author => author.name).join(', ');
  }
}