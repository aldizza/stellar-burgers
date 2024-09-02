import { describe, expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  orderReducer,
  orderSlice,
  resetCreateOrder,
  TOrderState,
  getOrderByNumber,
  selectorOrderStatus,
  selectorModalData,
  initialState
} from '../services/slices/order';
import { RequestStatus } from '../utils/types';

const orderMockData: TOrderState = {
  info: {
    _id: 'order123',
    status: 'done',
    name: 'Burger Order',
    createdAt: '2024-09-02T12:34:56Z',
    updatedAt: '2024-09-02T12:34:56Z',
    number: 101,
    ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
  },
  status: RequestStatus.Idle
};

describe('Тест orderSlice', () => {
  test('Тесты селекторов selectorOrderStatus и selectorModalData', () => {
    const store = configureStore({
      reducer: {
        order: orderSlice.reducer
      },
      preloadedState: {
        order: orderMockData
      }
    });

    const orderRequest = selectorOrderStatus(store.getState());
    const modal = selectorModalData(store.getState());

    expect(orderRequest).toEqual(orderMockData.status);
    expect(modal).toEqual(orderMockData.info);
  });

  test('Тест resetCreateOrder', () => {
    const stateWithOrder: TOrderState = {
      info: orderMockData.info,
      status: RequestStatus.Success
    };

    const newState = orderReducer(stateWithOrder, resetCreateOrder());

    expect(newState).toEqual(initialState);
  });

  test('Тест getOrderByNumber - fulfilled', () => {
    const fulfilledAction = {
      type: getOrderByNumber.fulfilled.type,
      payload: orderMockData.info
    };

    const newState = orderReducer(initialState, fulfilledAction);

    expect(newState.status).toEqual(RequestStatus.Success);
    expect(newState.info).toEqual(orderMockData.info);
  });

  test('Тест getOrderByNumber - pending', () => {
    const pendingAction = {
      type: getOrderByNumber.pending.type
    };

    const newState = orderReducer(initialState, pendingAction);

    expect(newState.status).toEqual(RequestStatus.Loading);
    expect(newState.info).toBeNull();
  });

  test('Тест getOrderByNumber - rejected', () => {
    const rejectedAction = {
      type: getOrderByNumber.rejected.type
    };

    const newState = orderReducer(initialState, rejectedAction);

    expect(newState.status).toEqual(RequestStatus.Failed);
    expect(newState.info).toBeNull();
  });
});
