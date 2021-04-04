import { createTypeReducer } from '@gulabs/redux-async-lib';

import * as WindowStateActions from '../actions/window-state-actions';

export type IState = {
  isSidebarOpened: boolean;
};

export const initialState: IState = {
  isSidebarOpened: true
};

export const toggleSidebarOpenStateReducer = WindowStateActions.toggleSidebarOpenStateAction.reducer<IState>((state, action) => {
  return {
    isSidebarOpened: !state.isSidebarOpened
  };
});

export const reducer = createTypeReducer(
  initialState,
  toggleSidebarOpenStateReducer
);
