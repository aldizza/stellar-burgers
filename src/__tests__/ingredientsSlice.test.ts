//QA Проверяем что fullfield отработал, rejected и panding 

import { describe, expect, test } from '@jest/globals';
import {
  TIngredientsState,
  selectorIngredientsState,
  selectorIngredientsData,
  selectorIngredientsLoading,
  getIngredients,
  ingredientsSlice,
  initialState
} from '../services/slices/ingredients';

import { configureStore } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-types';

// Мокированные данные ингредиентов
const mockIngredients: TIngredientsState = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0944',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 44,
      calories: 99,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 70,
      fat: 45,
      carbohydrates: 55,
      calories: 593,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 50,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 450,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    }
  ],
  status: RequestStatus.Idle
};

describe('Тесты слайса ingredientsSlice', () => {
  test('Тесты selectorIngredientsState, selectorIngredientsData, selectorIngredientsLoading', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: mockIngredients
      }
    });
    const ingredientsState = selectorIngredientsState(store.getState());
    const ingredients = selectorIngredientsData(store.getState());
    const loading = selectorIngredientsLoading(store.getState());
    expect(ingredientsState).toEqual(mockIngredients);
    expect(loading).toEqual(mockIngredients.status);
    expect(ingredients).toEqual(mockIngredients.ingredients);
  });

  test('Тесты редьюсера getIngredientsList, check fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients.ingredients
    };
    const stateReceived = ingredientsSlice.reducer(initialState, action);
    expect(stateReceived.ingredients).toEqual(mockIngredients.ingredients);
    expect(stateReceived.status).toEqual('Success');
  });

  test('Тесты редьюсера getIngredientsList, check rejected', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredients.rejected(new Error('error'), 'Ошибка!')
    );
    expect(stateReceived.ingredients).toEqual([]);
    expect(stateReceived.status).toEqual('Failed');
  });

  test('Тесты редьюсера getIngredientsList, check pending', () => {
    const stateReceived = ingredientsSlice.reducer(
      initialState,
      getIngredients.pending('')
    );
    expect(stateReceived.status).toEqual('Loading');
  });
});
