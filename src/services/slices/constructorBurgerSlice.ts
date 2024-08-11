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
  isLoading: false,
  hasError: false,
  orderRequest: false,
  orderModalData: null
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TConstructorIngredient[]>) => {
          state.ingredients = action.payload; // Устанавливаем полученные ингредиенты
          state.isLoading = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  setLoading,
  setError
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
