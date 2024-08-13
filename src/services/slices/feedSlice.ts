//Нужно уточнить у наставника насчет типизации feedstate

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { RequestStatus, TOrdersData } from '../../utils/types';
import { TOrder } from '@utils-types';

interface IFeedState {
  orders: TOrder[];
  status: RequestStatus;
  data: TOrdersData;
}

export const initialState: IFeedState = {
  orders: [],
  status: RequestStatus.Idle,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

// Создаем асинхронный thunk для получения заказов
export const getFeeds = createAsyncThunk<TOrdersData>(
  'order/feed',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    return await getFeedsApi();
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.data.total = action.payload.total;
        state.data.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotal: (state) => state.data.total,
    selectTotalToday: (state) => state.data.totalToday,
    selectFeedStatus: (state) => state.status,
    selectFeed: (state) => state
  }
});

export const { clearFeed } = feedSlice.actions;
export const {
  selectFeedOrders,
  selectTotal,
  selectTotalToday,
  selectFeedStatus,
  selectFeed
} = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
