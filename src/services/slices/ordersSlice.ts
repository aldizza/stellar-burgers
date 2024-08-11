import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  orderData: TOrder | null; // Добавлено
  isLoading: boolean;
  hasError: boolean;
  feed: any;
};

const initialState: TOrdersState = {
  orders: [],
  orderData: null, // Инициализация
  isLoading: false,
  hasError: false,
  feed: {}
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setOrderData: (state, action: PayloadAction<TOrder | null>) => {
      // Добавленный экшен
      state.orderData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  }
});

export const { setOrders, setOrderData, setLoading, setError } =
  ordersSlice.actions;
export default ordersSlice.reducer;
