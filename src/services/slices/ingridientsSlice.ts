/* eslint-disable */

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


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { RootState } from '../store';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];// для хранения списка ингредиентов, загруженных с сервера
  isLoading: boolean; //для отслеживания текущего процесса загрузки данных
  hasError: boolean; //для отслеживания ошибок
};

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  hasError: false, //потому что в начале работы приложения или при инициализации запроса ошибки еще не произошло
};

// Асинхронный Thunk для получения данных ингредиентов
//функция отвечает за получение (fetch) данных об ингредиентах (через сетевой запрос)
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIsLoading = (state: RootState) => state.ingredients.isLoading;
export const selectHasError = (state: RootState) => state.ingredients.hasError;

export default ingredientsSlice.reducer;
