//Готов
import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RequestStatus } from '../../utils/types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  status: RequestStatus;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.ingredients = action.payload; // Изменение состояния должно быть правильным
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorIngredientsState: (state: TIngredientsState) => state,
    selectorIngredientsData: (state: TIngredientsState) => state.ingredients,
    selectorIngredientsLoading: (state: TIngredientsState) => state.status,
    getBuns: (state) => state.ingredients.filter((item) => item.type === 'bun'),
    getMains: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    getSauces: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce')
  }
});

export const {
  selectorIngredientsState,
  selectorIngredientsData,
  selectorIngredientsLoading,
  getBuns,
  getMains,
  getSauces
} = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
