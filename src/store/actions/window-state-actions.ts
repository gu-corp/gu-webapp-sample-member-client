import { createTypeAction } from '@gulabs/redux-async-lib';

export const openDrawer = createTypeAction('OPEN_DRAWER', () => {});
export const closeDrawer = createTypeAction('CLOSE_DRAWER', () => {});