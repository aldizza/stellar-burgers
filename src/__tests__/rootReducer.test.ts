//Полностью готов
import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer as rootReducerObject } from '../services/store';
import { ingredientsReducer } from '../services/slices/ingredients';
import { burgerConstructorReducer } from '../services/slices/burgerConstructor';
import { feedReducer } from '../services/slices/feed';
import { orderReducer } from '../services/slices/order';
import { ordersReducer } from '../services/slices/orders';
import { userReducer } from '../services/slices/user';

// Создание функции rootReducer из объекта rootReducerObject
const rootReducer = combineReducers(rootReducerObject);

describe('rootReducer', () => {
  it('проверяет правильную настройку и работу rootReducer: вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращает корректное начальное состояние хранилища', () => {
    //При передаче type: '@@INIT' возвращается обьект с данными полями
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      burgerConstructor: burgerConstructorReducer(undefined, initAction),
      feeds: feedReducer(undefined, initAction),
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
      feeds: feedReducer(undefined, unknownAction),
      ingredients: ingredientsReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      orders: ordersReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction)
    });
  });
});
