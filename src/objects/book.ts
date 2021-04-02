import * as GTypes from './gtypes';

export class Book {
  constructor(
    public id: string,
    public title: string,
    public description?: string  
  ) {}

  public static createFromGBook(book: GTypes.Book): Book {
    return new Book(
      book.id,
      book.title,
      <string>book.description
    );
  }

  public static createFromGBookArray(gbooks: GTypes.Book[]) : Book[] {
    const books: Book[] = [];
    gbooks.forEach(gbook => books.push(Book.createFromGBook(gbook)));
    return books;
  }
}