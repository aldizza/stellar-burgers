
import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorSlice } from '../services/slices/burgerConstructor';
import { feedSlice } from '../services/slices/feed';
import { orderSlice } from '../services/slices/order';
import { ingredientsSlice } from '../services/slices/ingredients';
import { ordersSlice } from '../services/slices/orders';
import { userSlice } from '../services/slices/user';

const rootReducer = {
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userSlice.name]: userSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
