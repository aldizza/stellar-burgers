//Готов, уточнить про очистку

import { orderBurgerApi } from '../../utils/burger-api';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  RequestStatus
} from '../../utils/types';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const orderBurger = createAsyncThunk<TOrder, { ingredients: string[] }>(
  'burgerConstructor/orderBurger',
  async ({ ingredients }) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    ingredientMoveUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredients = state.ingredients;
      const ingredientId = action.payload.id;
      const ingredientIndex = ingredients.findIndex((item) => item.id === ingredientId);
      if (ingredientIndex > 0) {
        ingredients.splice(ingredientIndex - 1, 2, ingredients[ingredientIndex], ingredients[ingredientIndex - 1]);
      }
    },
    ingredientMoveDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredients = state.ingredients;
      const ingredientId = action.payload.id;
      const ingredientIndex = ingredients.findIndex((item) => item.id === ingredientId);
      if (ingredientIndex > -1 && ingredientIndex < ingredients.length - 1) {
        ingredients.splice(ingredientIndex, 2, ingredients[ingredientIndex + 1], ingredients[ingredientIndex]);
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    updateConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state) => {
        state.bun = initialState.bun;
        state.ingredients = initialState.ingredients;
        })
  },
  selectors: {
    selectorConstructorsItems: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  ingredientMoveDown,
  ingredientMoveUp,
  clearConstructor,
  updateConstructor
} = burgerConstructorSlice.actions;

export const selectorConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
