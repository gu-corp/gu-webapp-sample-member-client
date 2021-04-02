import { BookGqlClient } from './gclient/book-client';
import { Book } from '~/objects';

const endpointUrl = process.env.NEXT_PUBLIC_API_SERVER_URL + '/book';

export class BookService {

  private _gqlClient;

  constructor() {
    this.listBooks = this.listBooks.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  getBook = async(id: string, token: string) => {
    this._gqlClient = new BookGqlClient({
      endPoint: endpointUrl,
      // credentials: 'same-origin',
      token: token
    });
    
    try {
      const result = await this._gqlClient.getBook('asdf');
      if ( result.errors ) {
        throw new Error(`Server Error :${result.errors.message}`);
      }
      return result.getBook;
    } catch ( error ) {
      throw new Error(`Error : ${error}`);
    }
  }

  async listBooks(token: string) {
    this._gqlClient = new BookGqlClient({
      endPoint: endpointUrl,
      // credentials: 'same-origin',
      token: token
    });

    try {
      const result = await this._gqlClient.listBooks();
      if ( result.errors ) {
        throw new Error(`Server Error :${result.errors.message}`);
      }
      const gbooks = result.listBooks;
      return Book.createFromGBookArray(gbooks);
    } catch ( error ) {
      throw new Error(`Calling listBooks failed: ${error}`);
    }
  }
}

export default new BookService();