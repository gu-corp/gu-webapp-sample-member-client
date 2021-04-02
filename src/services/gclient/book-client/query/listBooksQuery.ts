import * as GTypes from '../../../../objects/gtypes';

export const listBooksQuery = () => `{
  listBooks {
    id,
    title,
    description
  }
}`;

export type LIST_BOOKS_RESULT_TYPE = GTypes.Book[]