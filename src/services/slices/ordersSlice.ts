// src/services/slices/ordersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../../utils/burger-api'; // Импортируйте API метод

type TOrderResponse = {
  orders: TOrder[];
};

type TOrdersState = {
  orders: TOrder[];
  orderData: TOrder | null;
  isLoading: boolean;
  hasError: boolean;
  feed: any;
};

const initialState: TOrdersState = {
  orders: [],
  orderData: null,
  isLoading: false,
  hasError: false,
  feed: {}
};

// Асинхронная Thunk-функция
export const fetchOrderData = createAsyncThunk<TOrder, number>(
  'orders/fetchOrderData',
  async (orderNumber, { rejectWithValue }) => {
    try {
      const response: TOrderResponse = await getOrderByNumberApi(orderNumber);
      const order = response.orders[0]; // Предполагается, что возвращается массив заказов
      if (!order) {
        throw new Error('Заказ не найден');
      }
      return order;
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных заказа');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setOrderData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        fetchOrderData.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.orderData = action.payload;
        }
      )
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        console.error(action.payload); // Обработка ошибки
      });
  }
});

export const { setOrders, setOrderData, setLoading, setError } =
  ordersSlice.actions;
export default ordersSlice.reducer;
