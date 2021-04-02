import { createTypeAsyncAction } from '@gulabs/redux-async-lib';
import HelloService from '../../services/hello-service';

export const getHello = createTypeAsyncAction('GET_HELLO', HelloService.getHello);