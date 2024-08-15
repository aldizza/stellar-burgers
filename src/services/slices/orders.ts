//Готов
//Заказы на странице профиля

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RequestStatus } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

export type TOrderState = {
  //детальная информация о заказе (данные через запрос по номеру заказа из урла)
  orders: TOrder[];
  status: RequestStatus;
};

export const initialState: TOrderState = {
  orders: [],
  status: RequestStatus.Idle
};

// Асинхронная Thunk-функция для получения списка заказов
export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.status = RequestStatus.Success;
        }
      )
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrders: (state) => state.orders,
    selectorOrdersStatus: (state) => state.status
  }
});

export const { selectorOrders, selectorOrdersStatus } = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
