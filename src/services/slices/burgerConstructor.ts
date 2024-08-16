// //Готов, уточнить про очистку

// import { orderBurgerApi } from '../../utils/burger-api';
// import {
//   TIngredient,
//   TConstructorIngredient,
//   TOrder,
//   RequestStatus
// } from '../../utils/types';
// import {
//   PayloadAction,
//   createAsyncThunk,
//   createSlice,
//   nanoid
// } from '@reduxjs/toolkit';
// import { RootState } from '../../services/store';

// type TConstructorState = {
//   bun: TIngredient | null;
//   ingredients: TConstructorIngredient[];
// };

// const initialState: TConstructorState = {
//   bun: null,
//   ingredients: []
// };

// // export const orderBurger = createAsyncThunk<TOrder, { ingredients: string[] }>(
// //   'burgerConstructor/orderBurger',
// //   async ({ ingredients }) => {
// //     const response = await orderBurgerApi(ingredients);
// //     return response.order;
// //   }
// // );

// export const createOrderBurger  = createAsyncThunk<TOrder, string[]>(
//   'burgerConstructor/orderBurger',
//   async (ingredientsId) => (await orderBurgerApi(ingredientsId)).order
// );

// // санка для получения заказов
// // export const createOrderBurger = createAsyncThunk('order/constructor', orderBurgerApi);

// export const burgerConstructorSlice = createSlice({
//   name: 'burgerConstructor',
//   initialState,
//   reducers: {
//     addIngredient: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         if (action.payload.type === 'bun') {
//           state.bun = action.payload;
//         } else {
//           state.ingredients.push(action.payload);
//         }
//       },
//       prepare: (ingredient: TConstructorIngredient) => {
//         const id = nanoid();
//         return { payload: { ...ingredient, id } };
//       }
//     },
//     removeIngredient: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       state.ingredients = state.ingredients.filter(
//         (item) => item.id !== action.payload.id
//       );
//     },
//     ingredientMoveUp: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       const ingredients = state.ingredients;
//       const ingredientId = action.payload.id;
//       const ingredientIndex = ingredients.findIndex(
//         (item) => item.id === ingredientId
//       );
//       if (ingredientIndex > 0) {
//         ingredients.splice(
//           ingredientIndex - 1,
//           2,
//           ingredients[ingredientIndex],
//           ingredients[ingredientIndex - 1]
//         );
//       }
//     },
//     ingredientMoveDown: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       const ingredients = state.ingredients;
//       const ingredientId = action.payload.id;
//       const ingredientIndex = ingredients.findIndex(
//         (item) => item.id === ingredientId
//       );
//       if (ingredientIndex > -1 && ingredientIndex < ingredients.length - 1) {
//         ingredients.splice(
//           ingredientIndex,
//           2,
//           ingredients[ingredientIndex + 1],
//           ingredients[ingredientIndex]
//         );
//       }
//     },
//     clearConstructor: (state) => {
//       state.bun = null;
//       state.ingredients = [];
//     },
//     updateConstructor: (
//       state,
//       action: PayloadAction<TConstructorIngredient[]>
//     ) => {
//       state.ingredients = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createOrderBurger.fulfilled, (state) => {
//       state.bun = initialState.bun;
//       state.ingredients = initialState.ingredients;
//     });
//   },
//   selectors: {
//     selectorConstructorsItems: (state) => state
//   }
// });

// export const {
//   addIngredient,
//   removeIngredient,
//   ingredientMoveDown,
//   ingredientMoveUp,
//   clearConstructor,
//   updateConstructor
// } = burgerConstructorSlice.actions;

// export const selectorConstructorItems = (state: RootState) =>
//   state.burgerConstructor;

// export const burgerConstructorReducer = burgerConstructorSlice.reducer;




//Не работает модальное окно

// //добавлено новое состояние orderRequest
// import { orderBurgerApi } from '../../utils/burger-api';
// import {
//   TIngredient,
//   TConstructorIngredient,
//   TOrder,
//   RequestStatus
// } from '../../utils/types';
// import {
//   PayloadAction,
//   createAsyncThunk,
//   createSlice,
//   nanoid
// } from '@reduxjs/toolkit';
// import { RootState } from '../../services/store';

// type TConstructorState = {
//   bun: TIngredient | null;
//   ingredients: TConstructorIngredient[];
//   orderRequest: RequestStatus; // Добавлено состояние для запроса
// };

// const initialState: TConstructorState = {
//   bun: null,
//   ingredients: [],
//   orderRequest: RequestStatus.Idle // Изначально запрос не выполняется
// };

// export const createOrderBurger = createAsyncThunk<TOrder, string[]>(
//   'burgerConstructor/orderBurger',
//   async (ingredientsId) => (await orderBurgerApi(ingredientsId)).order
// );

// export const burgerConstructorSlice = createSlice({
//   name: 'burgerConstructor',
//   initialState,
//   reducers: {
//     addIngredient: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         if (action.payload.type === 'bun') {
//           state.bun = action.payload;
//         } else {
//           state.ingredients.push(action.payload);
//         }
//       },
//       prepare: (ingredient: TConstructorIngredient) => {
//         const id = nanoid();
//         return { payload: { ...ingredient, id } };
//       }
//     },
//     removeIngredient: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       state.ingredients = state.ingredients.filter(
//         (item) => item.id !== action.payload.id
//       );
//     },
//     ingredientMoveUp: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       const ingredients = state.ingredients;
//       const ingredientId = action.payload.id;
//       const ingredientIndex = ingredients.findIndex(
//         (item) => item.id === ingredientId
//       );
//       if (ingredientIndex > 0) {
//         ingredients.splice(
//           ingredientIndex - 1,
//           2,
//           ingredients[ingredientIndex],
//           ingredients[ingredientIndex - 1]
//         );
//       }
//     },
//     ingredientMoveDown: (
//       state,
//       action: PayloadAction<TConstructorIngredient>
//     ) => {
//       const ingredients = state.ingredients;
//       const ingredientId = action.payload.id;
//       const ingredientIndex = ingredients.findIndex(
//         (item) => item.id === ingredientId
//       );
//       if (ingredientIndex > -1 && ingredientIndex < ingredients.length - 1) {
//         ingredients.splice(
//           ingredientIndex,
//           2,
//           ingredients[ingredientIndex + 1],
//           ingredients[ingredientIndex]
//         );
//       }
//     },
//     clearConstructor: (state) => {
//       state.bun = null;
//       state.ingredients = [];
//     },
//     updateConstructor: (
//       state,
//       action: PayloadAction<TConstructorIngredient[]>
//     ) => {
//       state.ingredients = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createOrderBurger.pending, (state) => {
//         state.orderRequest = RequestStatus.Loading;
//       })
//       .addCase(createOrderBurger.fulfilled, (state) => {
//         state.orderRequest = RequestStatus.Success;
//         state.bun = initialState.bun;
//         state.ingredients = initialState.ingredients;
//       })
//       .addCase(createOrderBurger.rejected, (state) => {
//         state.orderRequest = RequestStatus.Failed;
//       });
//   },
//   selectors: {
//     selectorConstructorsItems: (state) => state
//   }
// });

// export const {
//   addIngredient,
//   removeIngredient,
//   ingredientMoveDown,
//   ingredientMoveUp,
//   clearConstructor,
//   updateConstructor
// } = burgerConstructorSlice.actions;

// export const selectorConstructorItems = (state: RootState) =>
//   state.burgerConstructor;

// export const burgerConstructorReducer = burgerConstructorSlice.reducer;



//Из видео помощи наставника помощь (16 августа)

import { orderBurgerApi } from '../../utils/burger-api';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder
} from '../../utils/types';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

export interface TConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean; 
  orderModalData: TOrder | null;
  error: string | null;
  loading: boolean;
}

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: [],
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false,
};



//У меня не получается использовать эту санку как в твоем видео, потому что возвращаемое значение response из orderBurgerApi не соответствует ожидаемому типу TOrder. 

// export const createOrderBurger = createAsyncThunk<TOrder, string[]>(
//   'burgerConstructor/orderBurger',
//   async (data: string[], { rejectWithValue }) => {
//     try {
//       const response = await orderBurgerApi(data);
//       return response;
//     } catch (error) {
//       return rejectWithValue('Ошибка при оформлении заказа');
//     }
//   }
// );

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
        payload: { ...ingredient, id: nanoid() },
      }),
    },
    removeIngredient: (
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      sliceState.constructorItems.ingredients = sliceState.constructorItems.ingredients.filter(
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
    clearConstructor: (sliceState) => {
      sliceState.constructorItems.bun = null;
      sliceState.constructorItems.ingredients = [];
    },
    updateConstructor: (
      sliceState,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      sliceState.constructorItems.ingredients = action.payload;
    },
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
    selectorIsLoading: (sliceState) => sliceState.loading,
  }
});

export const {
  addIngredient,
  removeIngredient,
  ingredientMoveUp,
  ingredientMoveDown,
  clearConstructor,
  updateConstructor,
} = burgerConstructorSlice.actions;


export const {
  selectorBurgerIngredients,
  selectorOrderRequest,
  selectorModalData,
  selectorIsLoading
} = burgerConstructorSlice.selectors;


export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const burgerConstructorActions = burgerConstructorSlice.actions;

