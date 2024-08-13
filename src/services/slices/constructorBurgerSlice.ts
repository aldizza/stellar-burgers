//ИСПРАВИТЬ МНОГО ОШИБОК


import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TConstructorState,
  TConstructorIngredient,
  TIngredient,
  TBun
} from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

// Начальное состояние
const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

// Асинхронная Thunk-функция для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'constructor/fetchIngredients',
  async (): Promise<TConstructorIngredient[]> => {
    const ingredients = await getIngredientsApi();
    return ingredients.map((ingredient: TIngredient) => ({
      ...ingredient,
      id: ingredient._id // Преобразуем _id в id
    }));
  }
);

const constructorBurgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TConstructorIngredient | null>) => {
      state.bun = action.payload; // Устанавливаем булочку
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
