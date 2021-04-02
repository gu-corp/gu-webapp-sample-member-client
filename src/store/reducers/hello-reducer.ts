import { createTypeReducer } from '@gulabs/redux-async-lib';

import * as HelloActions from '../actions/hello-actions';

export type IState = {
  helloMessage: string;
};

export const initialState: IState = {
  helloMessage: '...'
};

export const getHello = HelloActions.getHello.reducer<IState>((state, action) => {
  if ( action.error ) {
    return {
      helloMessage: 'error'
    }
  }
  return {
    helloMessage: JSON.stringify(action.payload),
  };
});

export const reducer = createTypeReducer(
  initialState,
  getHello
);
