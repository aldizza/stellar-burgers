import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorState, TBun, TConstructorIngredient } from '../../utils/types'; // Убедитесь, что пути правильные

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  isLoading: false,
  hasError: false,
  orderRequest: false,
  orderModalData: null, 
};

const constructorBurgerSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    // Действие для установки булочки
    setBun: (state, action: PayloadAction<TBun | null>) => {
      state.bun = action.payload ? { ...action.payload } : null;
    },
    // Действие для добавления ингредиента
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    // Действие для удаления ингредиента по его индексу
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter((_, index) => index !== action.payload);
    },
    // Действие для перетаскивания ингредиента (например, изменения его позиции)
    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [movedIngredient] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedIngredient);
    },
    // Действие для установки состояния загрузки
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Действие для установки состояния ошибки
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  }
});

// Экспортируем действия
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  setLoading,
  setError
} = constructorBurgerSlice.actions;

// Экспортируем редьюсер по умолчанию
export default constructorBurgerSlice.reducer;
