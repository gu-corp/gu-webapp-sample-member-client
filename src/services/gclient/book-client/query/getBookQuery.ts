import * as GTypes from '../../../../objects/gtypes';

export const getBookQuery = (id: string) => `{
  books(id: ${id}) {
    title
  }
}`;

export type GET_BOOK_RESULT_TYPE = GTypes.Book