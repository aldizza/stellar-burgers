//Старкит

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

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store'; // Убедитесь, что путь правильный
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  // Получаем данные ингредиента из Redux store
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.currentIngredient
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
