//Полностью готов
import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer as rootReducerObject } from '../services/store';
import { ingredientsReducer } from 'src/services/slices/ingredients';
import { burgerConstructorReducer } from 'src/services/slices/burgerConstructor';
import { feedReducer } from 'src/services/slices/feed';
import { orderReducer } from 'src/services/slices/order';
import { ordersReducer } from 'src/services/slices/orders';
import { userReducer } from 'src/services/slices/user';

// Создание функции rootReducer из объекта rootReducerObject
const rootReducer = combineReducers(rootReducerObject);

describe('rootReducer', () => {
  it('проверяет правильную настройку и работу rootReducer: вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращает корректное начальное состояние хранилища', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      burgerConstructor: burgerConstructorReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      ingredients: ingredientsReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      orders: ordersReducer(undefined, initAction),
      user: userReducer(undefined, initAction)
    });
  });

  it('вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);
    expect(state).toEqual({
      burgerConstructor: burgerConstructorReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      ingredients: ingredientsReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      orders: ordersReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction)
    });
  });
});
