import { GraphqlClient, GqlClientOptions } from '@gulabs/gubase-client-lib';
import { getBookQuery, GET_BOOK_RESULT_TYPE } from './query/getBookQuery';
import { listBooksQuery, LIST_BOOKS_RESULT_TYPE } from './query/listBooksQuery';

export class BookGqlClient extends GraphqlClient {
  constructor(options: GqlClientOptions) {
    super(options);
  }

  public async getBook(id: string) {
    return this.doQuery<GET_BOOK_RESULT_TYPE, void>(getBookQuery(id));
  }

  public async listBooks() {
    return this.doQuery<LIST_BOOKS_RESULT_TYPE, void>(listBooksQuery());
  }
}
