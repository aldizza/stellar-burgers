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

import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredientsData } from '../../services/slices/ingridientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector(selectIngredientsData).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
