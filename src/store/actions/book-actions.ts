import { createTypeAsyncAction } from '@gulabs/redux-async-lib';
import BookService from '../../services/book-service';
import { Book } from '../../objects';

// export const listBooks = createTypeAsyncAction('LIST_BOOKS', BookService.listBooks);
export const listBooks = createTypeAsyncAction('LIST_BOOKS', BookService.listBooks);

export const getHello = createTypeAsyncAction('GET_HELLO', async () => "");