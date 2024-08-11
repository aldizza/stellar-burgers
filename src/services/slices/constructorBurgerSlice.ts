//Примерный слайс исправить 

/* eslint-disable */

// Пример исправленного кода без лишнего пробела
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any; // Замените тип any на соответствующий тип
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
};

const constructorBurgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) { // Допустим, action.payload — это ID ингредиента
      state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload);
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<any>) { // Замените тип any на соответствующий тип
      state.orderModalData = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} = constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
