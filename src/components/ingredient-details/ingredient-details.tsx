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

import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  selectorIngredientsData,
  selectorIngredientsState
} from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useSelector(selectorIngredientsState);

  const ingredientData = useSelector(selectorIngredientsData).find(
    (item: TIngredient) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
