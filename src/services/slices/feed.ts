import { RequestStatus } from '../../utils/types';
import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export interface IFeedState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  status: RequestStatus;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const getFeeds = createAsyncThunk('order/feeds', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feeds',
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
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorFeed: (state) => state,
    selectorFeedOrders: (state) => state.orders,
    selectorFeedTotal: (state) => state.total,
    selectorFeedTotalToday: (state) => state.totalToday,
    selectFeedStatus: (state) => state.status
  }
});

export const {
  selectorFeed,
  selectorFeedOrders,
  selectorFeedTotal,
  selectorFeedTotalToday,
  selectFeedStatus
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
