// Для создания файла ingredientsSlice.ts и интеграции его с Redux и API запросами, выполните следующие шаги:

// Создаем слайс с использованием createSlice:

// 1) Описываем начальное состояние.
// 2) Создаем редюсеры для управления состоянием.
// 3) Добавляем экшен для загрузки данных и обработки успеха/ошибки.
// 4) Создаем асинхронную Thunk-функцию:
// 5) Используем API запросы из burger-api.ts для получения данных.
// 6) Управляем состоянием загрузки и ошибок.
// 7) Подключить слайс к rootReducer:
// 8) Добавить редюсер ингредиентов в rootReducer.

//слайс для ингридиентов

import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, RequestStatus } from '../../utils/types';

type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

const initialState: TIngredientState = {
  data: [],
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
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectIngredientsData: (state: TIngredientState) => state.data,
    selectIngredientsStatus: (state: TIngredientState) => state.status
  }
});

export const selectIngredients = ingredientsSlice.selectors;
export const { selectIngredientsData, selectIngredientsStatus } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
