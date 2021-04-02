import { createTypeReducer } from '@gulabs/redux-async-lib';

import { Book } from '../../objects';
import * as BookActions from '../actions/book-actions';

export type IState = {
  books: Book[];
  isBookLoaded: boolean;
  helloMessage: string;
  errorMessage?: string;
};

export const initialState: IState = {
  books: [],
  isBookLoaded: false,
  helloMessage: ''
};

export const listBooks = BookActions.listBooks.reducer<IState>((state, action) => {
  if ( action.error ) {
    return {
      errorMessage: 'Can not get books'
    }
  }
  return {
    errorMessage: undefined,
    isBookLoaded: true,
    books: <Book[]>action.payload
  };
});

export const reducer = createTypeReducer(
  initialState,
  listBooks
);
