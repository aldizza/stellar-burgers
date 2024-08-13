//Слайс для детального заказа
//Детальный заказ будет заполняться когда заходим по прямому урлу и загружаем
//страницу заказа по прямому урлу, тогда будет диспатчится событие на получение заказа по его номеру
// и устанавливаться в стор


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { RequestStatus, TOrder } from '../../utils/types';

interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

export const initialState: TOrderState = {
    info: null,
    status: 'Idle'
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
          state.status = 'Loading'; // Установка статуса загрузки
        })
        .addCase(getOrderByNumber.fulfilled, (state, action: PayloadAction<TOrder>) => {
          state.status = 'Success'; // Установка статуса успешного завершения
          state.info = action.payload; // Обновление данных заказа
        })
        .addCase(getOrderByNumber.rejected, (state) => {
          state.status = 'Failed'; // Установка статуса ошибки
        });
    }
  });

// Селекторы определены вне слайса, так как createSlice не поддерживает ключ selectors.
export const selectOrderData = (state: { order: TOrderState }) => state.order.info;
export const selectOrderStatus = (state: { order: TOrderState }) => state.order.status;
export const selectorIngredients = orderSlice.selectors;

export default orderSlice.reducer;