import * as uuid from 'uuid';

export class Book {
  public _id: string;

  get id() {
    return this._id;
  }

  constructor(
    public title: string,
    public description?: string,
  ){
    this._id = uuid.v4();
  }
}

class BookService {

  private _books: Book[] = [];

  constructor() {
    this._books.push(new Book('book1', 'book1description'));
    this._books.push(new Book('book2', 'book2description'));
    this._books.push(new Book('book3', 'book3description'));
  }

  getBook = async(id: string) => {
    return this._books.find( book => book.id === id);
  }
  
  listBook = async() => {
    return this._books;
  }
  
  addBook = async(book: Book) => {
    this._books.push(book);
    return book;
  }
  
   removeBook = async(id: string): Promise<boolean> => {
    const targetIndex = this._books.findIndex( book => book.id === id);
    if ( targetIndex > 0 ) {
      this._books.splice(targetIndex, 1);
      return true;
    }
    return false; 
  }
}

export default new BookService();