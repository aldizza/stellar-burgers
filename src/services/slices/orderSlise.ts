//Слайс для детального заказа
//Детальный заказ будет заполняться когда заходим по прямому урлу и загружаем
//страницу заказа по прямому урлу, тогда будет диспатчится событие на получение заказа по его номеру
// и устанавливаться в стор

//Полностью готов, ничего править не нужно

import { getOrderByNumberApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, RequestStatus } from '../../utils/types';

interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

export const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrderData: (state: TOrderState) => state.info,
    selectorOrderStatus: (state: TOrderState) => state.status
  }
});

export const selectorIngredients = orderSlice.selectors;
export const { selectorOrderData, selectorOrderStatus } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
