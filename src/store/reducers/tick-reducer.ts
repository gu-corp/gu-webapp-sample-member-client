import { createTypeReducer } from '@gulabs/redux-async-lib';
import * as TickActions from '../actions/tick-actions';

export type IState = {
  lastUpdate: number,
  light: boolean,
  count: number,
};
const initialState: IState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}

export const tickReducer = TickActions.tick.reducer<IState>((state, action) => {
  return {
    ...state,
    lastUpdate: action.payload.lastUpdate,
    light: !!action.payload.light,
  }
});

export const incrementReducer = TickActions.increment.reducer<IState>((state, action) => {
  return {
    ...state,
    count: state.count + 1,
  }
})

export const decrementReducer = TickActions.decrement.reducer<IState>((state, action) => {
  return {
    ...state,
    count: state.count - 1,
  }
})

export const resetReducer = TickActions.reset.reducer<IState>((state, action) => {
  return {
    ...state,
    count: initialState.count,
  }
})

export const reducer = createTypeReducer(
  initialState,
  tickReducer,
  incrementReducer,
  decrementReducer,
  resetReducer
);