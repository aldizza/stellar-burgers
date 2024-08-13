// Проверить ordersSlice

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, RequestStatus } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api'; // Импортируйте API метод

type TOrderResponse = {
  orders: TOrder[];
};

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  hasError: boolean;
  currentOrder: TOrder | null; // текущий заказ для отображения
  status: RequestStatus;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  hasError: false,
  currentOrder: null,
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
    selectOrders: (state) => state.orders,
    selectOrdersStatus: (state) => state.status
  }
});

export const { selectOrders, selectOrdersStatus } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
