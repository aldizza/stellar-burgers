// import { burgerConstructorSlice, IConstructorState } from '../services/slices/burgerConstructor';
// import { TIngredient, TOrder } from '../utils/types';
// import { nanoid } from '@reduxjs/toolkit';

// const { addIngredient, removeIngredient, ingredientMoveUp, ingredientMoveDown } = burgerConstructorSlice.actions;

// const initialState: IConstructorState = {
//   constructorItems: {
//     bun: null,
//     ingredients: []
//   },
//   orderRequest: false,
//   orderModalData: null,
//   error: null,
//   loading: false
// };

// describe('burgerConstructorSlice reducer', () => {
//   it('should handle addIngredient', () => {
//     const ingredient: TIngredient = {
//         _id: '111',
//         name: 'Булка',
//         type: 'top',
//         proteins: 12,
//         fat: 33,
//         carbohydrates: 22,
//         calories: 33,
//         price: 123,
//         image: '',
//         image_large: '',
//         image_mobile: ''
//     };
//     const newState = burgerConstructorSlice.reducer(initialState, addIngredient(ingredient));

//     expect(newState.constructorItems.ingredients).toContainEqual(ingredient);
//   });

//   it('should handle removeIngredient', () => {
//     const ingredient: TIngredient = {
//       _id: nanoid(),
//       name: 'Tomato Sauce',
//       type: 'sauce',
//       proteins: 1,
//       fat: 1,
//       carbohydrates: 1,
//       calories: 10,
//       price: 50,
//       image: 'image-url',
//       image_large: 'large-image-url',
//       image_mobile: 'mobile-image-url'
//     };
//     const initialStateWithIngredient = {
//       ...initialState,
//       constructorItems: {
//         bun: null,
//         ingredients: [ingredient]
//       }
//     };
//     const newState = burgerConstructorSlice.reducer(initialStateWithIngredient, removeIngredient(ingredient));

//     expect(newState.constructorItems.ingredients).not.toContainEqual(ingredient);
//   });

//   it('should handle ingredientMoveUp', () => {
//     const ingredient1: TIngredient = {
//       _id: nanoid(),
//       name: 'Tomato Sauce',
//       type: 'sauce',
//       proteins: 1,
//       fat: 1,
//       carbohydrates: 1,
//       calories: 10,
//       price: 50,
//       image: 'image-url',
//       image_large: 'large-image-url',
//       image_mobile: 'mobile-image-url'
//     };
//     const ingredient2: TIngredient = {
//       _id: nanoid(),
//       name: 'Beef Patty',
//       type: 'meat',
//       proteins: 20,
//       fat: 15,
//       carbohydrates: 0,
//       calories: 250,
//       price: 150,
//       image: 'image-url',
//       image_large: 'large-image-url',
//       image_mobile: 'mobile-image-url'
//     };
//     const initialStateWithIngredients = {
//       ...initialState,
//       constructorItems: {
//         bun: null,
//         ingredients: [ingredient1, ingredient2]
//       }
//     };
//     const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, ingredientMoveUp(ingredient2));

//     expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
//     expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
//   });

//   it('should handle ingredientMoveDown', () => {
//     const ingredient1: TConstructorIngredient = {
//       id: nanoid(),
//       _id: nanoid(),
//       name: 'Tomato Sauce',
//       type: 'sauce',
//       proteins: 1,
//       fat: 1,
//       carbohydrates: 1,
//       calories: 10,
//       price: 50,
//       image: 'image-url',
//       image_large: 'large-image-url',
//       image_mobile: 'mobile-image-url'
//     };
//     const ingredient2: TConstructorIngredient = {
//       id: nanoid(),
//       _id: nanoid(),
//       name: 'Beef Patty',
//       type: 'meat',
//       proteins: 20,
//       fat: 15,
//       carbohydrates: 0,
//       calories: 250,
//       price: 150,
//       image: 'image-url',
//       image_large: 'large-image-url',
//       image_mobile: 'mobile-image-url'
//     };
//     const initialStateWithIngredients = {
//       ...initialState,
//       constructorItems: {
//         bun: null,
//         ingredients: [ingredient1, ingredient2]
//       }
//     };
//     const newState = burgerConstructorSlice.reducer(initialStateWithIngredients, ingredientMoveDown(ingredient1));

//     expect(newState.constructorItems.ingredients[0]).toEqual(ingredient2);
//     expect(newState.constructorItems.ingredients[1]).toEqual(ingredient1);
//   });
// });
