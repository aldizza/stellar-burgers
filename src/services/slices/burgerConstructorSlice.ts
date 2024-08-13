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

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  order: TOrder | null;
  error: string | null;
  requestStatus: RequestStatus;
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  order: null,
  error: null,
  requestStatus: RequestStatus.Idle
};

//??? Переделать, может можно изящней?
// export const orderBurger = createAsyncThunk<TOrder, string[]>(
//   'burgerConstructor/orderBurger',
//   async (ingredientIds) => (await orderBurgerApi(ingredientIds)).order
// );

//Проверка не работает(
export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => {
    const response = await orderBurgerApi(ingredientIds);
    console.log('Order response:', response);
    return response.order;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    sortingIngredients: (state, action) => {
      const { positionA, positionB } = action.payload;
      state.ingredients[positionA] = state.ingredients.splice(
        positionB,
        1,
        state.ingredients[positionA]
      )[0];
    },
    clearConstructor: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.requestStatus = RequestStatus.Success;
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectConstructorsItems: (state) => state,
    selectConstructorsRequest: (state) => state.requestStatus,
    selectConstructorsOrder: (state) => state.order
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  selectConstructorsItems,
  selectConstructorsRequest,
  selectConstructorsOrder
} = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  sortingIngredients,
  clearConstructor
} = burgerConstructorSlice.actions;
