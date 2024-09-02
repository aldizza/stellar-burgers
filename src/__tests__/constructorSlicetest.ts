import {
  burgerConstructorSlice,
  IConstructorState
} from '../services/slices/burgerConstructor';
import { TConstructorIngredient } from '../utils/types';

const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;

describe('burgerConstructorSlice', () => {
  const bun: TConstructorIngredient = {
    id: '111',
    _id: '111',
    name: 'Булочка',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'Начинка.jpeg',
    image_large: 'bun_large.jpeg',
    image_mobile: 'bun_mobile.jpeg'
  };

  const ingredient1: TConstructorIngredient = {
    id: '222',
    _id: '222',
    name: 'Начинка',
    type: 'adding',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'Начинка.jpeg',
    image_large: 'adding_large.jpeg',
    image_mobile: 'adding_mobile.jpeg'
  };

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

  it('добавление ингредиента', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual(
      expect.objectContaining({
        ...ingredient1,
        id: expect.any(String) // nanoid добавляет уникальный идентификатор
      })
    );
  });

  it('добавление булочки', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual(
      expect.objectContaining({
        ...bun,
        id: expect.any(String) // уникальный идентификатор
      })
    );
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('удаление ингредиента', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredient1]
      }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredient,
      removeIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });
});
