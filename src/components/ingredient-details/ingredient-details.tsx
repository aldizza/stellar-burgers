//Стартер

// import { FC } from 'react';
// import { Preloader } from '../ui/preloader';
// import { IngredientDetailsUI } from '../ui/ingredient-details';

// export const IngredientDetails: FC = () => {
//   /** TODO: взять переменную из стора */
//   const ingredientData = null;

//   if (!ingredientData) {
//     return <Preloader />;
//   }

//   return <IngredientDetailsUI ingredientData={ingredientData} />;
// };

//Для того чтобы использовать данные ингредиента из состояния Redux в вашем компоненте IngredientDetails, вам нужно подключить компонент к Redux store и использовать хук useSelector для получения данных из состояния.

// import { FC } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../services/store'; // Убедитесь, что путь правильный
// import { Preloader } from '../ui/preloader';
// import { IngredientDetailsUI } from '../ui/ingredient-details';

// export const IngredientDetails: FC = () => {
//   // Получаем данные ингредиента из Redux store
//   const ingredientData = useSelector(
//     (state: RootState) => state.ingredients.currentIngredient
//   );

//   if (!ingredientData) {
//     return <Preloader />;
//   }

//   return <IngredientDetailsUI ingredientData={ingredientData} />;
// };

// Не трогать (как у Максима минута 10.20)

import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../services/store';
import {
  fetchIngredientById,
  selectIngredients
} from '../../services/slices/ingridientsSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector(selectIngredients).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
