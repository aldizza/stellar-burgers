import { orderBurgerApi } from '../../utils/burger-api';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';

export interface IConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  loading: boolean;
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
};

//Для удобного создания асинхронных экшенов есть функция createAsyncThunk
export const createOrderBurger = createAsyncThunk<TOrder, string[]>(
  'burgerConstructor/orderBurger',
  async (ingredientsId) => (await orderBurgerApi(ingredientsId)).order
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        sliceState,
        { payload }: PayloadAction<TConstructorIngredient>
      ) => {
        if (payload.type === 'bun') {
          sliceState.constructorItems.bun = payload;
        } else {
          sliceState.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    removeIngredient: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      sliceState.constructorItems.ingredients =
        sliceState.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    ingredientMoveUp: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredients = sliceState.constructorItems.ingredients;
      const ingredientId = action.payload.id;
      const ingredientIndex = ingredients.findIndex(
        (item) => item.id === ingredientId
      );
      if (ingredientIndex > 0) {
        ingredients.splice(
          ingredientIndex - 1,
          2,
          ingredients[ingredientIndex],
          ingredients[ingredientIndex - 1]
        );
      }
    },
    ingredientMoveDown: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredients = sliceState.constructorItems.ingredients;
      const ingredientId = action.payload.id;
      const ingredientIndex = ingredients.findIndex(
        (item) => item.id === ingredientId
      );
      if (ingredientIndex > -1 && ingredientIndex < ingredients.length - 1) {
        ingredients.splice(
          ingredientIndex,
          2,
          ingredients[ingredientIndex + 1],
          ingredients[ingredientIndex]
        );
      }
    },
    closeOrderModalData: (sliceState) => {
      sliceState.orderModalData = null;
    },
    clearConstructor: (sliceState) => {
      sliceState.constructorItems.bun = null;
      sliceState.constructorItems.ingredients = [];
    },
    updateConstructor: (
      sliceState,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      sliceState.constructorItems.ingredients = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderBurger.pending, (sliceState) => {
        sliceState.loading = true;
        sliceState.error = null;
        sliceState.orderRequest = true;
      })
      .addCase(createOrderBurger.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orderRequest = false;
        sliceState.error = action.payload as string | null;
      })
      .addCase(createOrderBurger.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.orderModalData = action.payload;
        sliceState.error = null;
        sliceState.orderRequest = false;
      });
  },
  selectors: {
    selectorBurgerIngredients: (sliceState) => sliceState.constructorItems,
    selectorOrderRequest: (sliceState) => sliceState.orderRequest,
    selectorModalData: (sliceState) => sliceState.orderModalData,
    selectorIsLoading: (sliceState) => sliceState.loading
  }
});

export const {
  addIngredient,
  removeIngredient,
  ingredientMoveUp,
  ingredientMoveDown,
  closeOrderModalData,
  clearConstructor,
  updateConstructor
} = burgerConstructorSlice.actions;

export const {
  selectorBurgerIngredients,
  selectorOrderRequest,
  selectorModalData,
  selectorIsLoading
} = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorActions = burgerConstructorSlice.actions;
