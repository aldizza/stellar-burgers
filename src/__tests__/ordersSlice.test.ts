import {
  ordersReducer,
  initialState,
  getOrders
} from '../services/slices/orders';
import { TOrder } from '@utils-types';
import { RequestStatus } from '@utils-types';

describe('ordersSlice reducers', () => {
  it('should return the initial state', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle getOrders.pending', () => {
    const nextState = ordersReducer(initialState, getOrders.pending(''));
    expect(nextState).toEqual({
      orders: [],
      status: RequestStatus.Loading
    });
  });

  it('should handle getOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'completed',
        name: 'Order 1',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T01:00:00Z',
        number: 1,
        ingredients: ['ingredient1']
      },
      {
        _id: '2',
        status: 'pending',
        name: 'Order 2',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T01:00:00Z',
        number: 2,
        ingredients: ['ingredient2']
      }
    ];

    const nextState = ordersReducer(
      initialState,
      getOrders.fulfilled(orders, '')
    );

    expect(nextState).toEqual({
      orders,
      status: RequestStatus.Success
    });
  });

  it('should handle getOrders.rejected', () => {
    const error = new Error('Failed to fetch orders');
    const nextState = ordersReducer(
      initialState,
      getOrders.rejected(error, '')
    );
    expect(nextState).toEqual({
      orders: [],
      status: RequestStatus.Failed
    });
  });
});
