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

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '../../utils/burger-api';
// import { RootState } from '../store';
// import { TIngredient, TConstructorIngredient } from '@utils-types';

// type TIngredientState = {
//   ingredients: TIngredient[]; // список ингредиентов
//   isLoading: boolean; // отслеживание процесса загрузки данных
//   hasError: boolean; // отслеживание ошибок
//   constructorItems: {
//     bun: TConstructorIngredient | null;
//     ingredients: TConstructorIngredient[];
//   };
//   orderRequest: boolean;
//   orderModalData: TConstructorIngredient | null;
//   currentIngredient: TIngredient | null; // текущий выбранный ингредиент
// };

// const initialState: TIngredientState = {
//   ingredients: [],
//   isLoading: false,
//   hasError: false, // инициализация ошибки как false
//   constructorItems: {
//     bun: null,
//     ingredients: []
//   },
//   orderRequest: false,
//   orderModalData: null,
//   currentIngredient: null // инициализация текущего ингредиента
// };

// // Асинхронный Thunk для получения данных ингредиентов
// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchIngredients',
//   async () => {
//     const response = await getIngredientsApi();
//     return response; // возвращаем данные ингредиентов
//   }
// );

// const ingredientsSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {
//     setCurrentIngredient: (state, action) => {
//       state.currentIngredient = action.payload; // установка текущего ингредиента
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.isLoading = true; // включаем лоадер
//         state.hasError = false; // сбрасываем ошибку при новом запросе
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.isLoading = false; // отключаем лоадер
//         state.ingredients = action.payload; // сохраняем полученные ингредиенты
//       })
//       .addCase(fetchIngredients.rejected, (state) => {
//         state.isLoading = false; // отключаем лоадер
//         state.hasError = true; // включаем флаг ошибки
//       });
//   }
// });

// // Экшены
// export const { setCurrentIngredient } = ingredientsSlice.actions;

// // Селекторы
// export const selectIngredients = (state: RootState) =>
//   state.ingredients.ingredients;
// export const selectIsLoading = (state: RootState) =>
//   state.ingredients.isLoading;
// export const selectHasError = (state: RootState) => state.ingredients.hasError;
// export const selectCurrentIngredient = (state: RootState) =>
//   state.ingredients.currentIngredient; // селектор для текущего ингредиента

// // Экспортируем редюсер
// export default ingredientsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api'; // Импортируем функцию для получения всех ингредиентов
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { RootState } from '../store';

export const fetchIngredientById = createAsyncThunk(
  'ingredients/fetchIngredientById',
  async (id: string) => {
    const ingredients = await getIngredientsApi(); // Получаем все ингредиенты
    const ingredient = ingredients.find((ingredient) => ingredient._id === id); // Находим нужный по ID

    return ingredient;
  }
);

type TIngredientState = {
  ingredients: TIngredient[]; // список ингредиентов
  isLoading: boolean; // отслеживание процесса загрузки данных
  hasError: boolean; // отслеживание ошибок
  constructorItems: {
    bun: TConstructorIngredient;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TConstructorIngredient;
  currentIngredient: TIngredient;
};

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
  constructorItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: '',
      id: ''
    },
    ingredients: []
  },
  orderRequest: false,
  orderModalData: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    id: ''
  },
  currentIngredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  }
};

// Асинхронный Thunk для получения данных ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response; // возвращаем данные ингредиентов
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload; // установка текущего ингредиента
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true; // включаем лоадер
        state.hasError = false; // сбрасываем ошибку при новом запросе
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false; // отключаем лоадер
        state.ingredients = action.payload; // сохраняем полученные ингредиенты
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false; // отключаем лоадер
        state.hasError = true; // включаем флаг ошибки
      });
  }
});

// Экшены
export const { setCurrentIngredient } = ingredientsSlice.actions;

// Селекторы
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectHasError = (state: RootState) => state.ingredients.hasError;
export const selectCurrentIngredient = (state: RootState) =>
  state.ingredients.currentIngredient; // селектор для текущего ингредиента

// Экспортируем редюсер
export default ingredientsSlice.reducer;
