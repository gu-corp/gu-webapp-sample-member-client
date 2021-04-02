import { createTypeAction } from '@gulabs/redux-async-lib';

export const tick = createTypeAction('TICK', () => { return { light: true, lastUpdate: Date.now() } });
export const increment = createTypeAction('INCREMENT', () => { return {} });
export const decrement = createTypeAction('DECREMENT', () => { return {} });
export const reset = createTypeAction('RESET', () => { return {} });