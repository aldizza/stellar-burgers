//управляет состоянием заказа в приложении
//Готов

// import { orderBurgerApi } from '@api';
// import { getOrderByNumberApi } from '../../utils/burger-api';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';
// import { RequestStatus } from '../../utils/types';

// export type TOrderState = {
//   //детальная информация о заказе (открыла модальное окно, получила данные через запрос по номеру заказа из урла)
//   info: TOrder | null;
//   status: RequestStatus;
// };

// export const initialState: TOrderState = {
//   info: null,
//   status: RequestStatus.Idle
// };

// export const getOrderByNumber = createAsyncThunk<TOrder, number>(
//   'order/getOrderByNumber',
//   async (number: number) => {
//     const response = await getOrderByNumberApi(number);
//     return response.orders[0];
//   }
// );

// export const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     resetCreateOrder: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getOrderByNumber.pending, (state) => {
//         state.status = RequestStatus.Loading;
//       })
//       .addCase(getOrderByNumber.fulfilled, (state, action) => {
//         state.info = action.payload;
//         state.status = RequestStatus.Success;
//       })
//       .addCase(getOrderByNumber.rejected, (state) => {
//         state.status = RequestStatus.Failed;
//       });
//   },
//   selectors: {
//     selectorOrderStatus: (state) => state.status,
//     selectorModalData: (state) => state.info
//   }
// });
// export const { resetCreateOrder } = orderSlice.actions;

// export const { selectorOrderStatus, selectorModalData } = orderSlice.selectors;

// export const orderReducer = orderSlice.reducer;

import { orderBurgerApi } from '@api';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RequestStatus } from '../../utils/types';

export type TOrderState = {
  //детальная информация о заказе (открыла модальное окно, получила данные через запрос по номеру заказа из урла)
  info: TOrder | null;
  status: RequestStatus;
};

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
  reducers: {
    resetCreateOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrderStatus: (state) => state.status,
    selectorModalData: (state) => state.info
  }
});
export const { resetCreateOrder } = orderSlice.actions;

export const { selectorOrderStatus, selectorModalData } = orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
