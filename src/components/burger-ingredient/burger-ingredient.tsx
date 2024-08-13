// import { FC, memo } from 'react';
// import { useLocation } from 'react-router-dom';

// import { BurgerIngredientUI } from '@ui';
// import { TBurgerIngredientProps } from './type';

// export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
//   ({ ingredient, count }) => {
//     const location = useLocation();

//     // Обработка добавления ингредиента
//     const handleAdd = () => {};

//     return (
//       <BurgerIngredientUI
//         ingredient={ingredient}
//         count={count}
//         locationState={{ background: location }}
//         handleAdd={handleAdd}
//       />
//     );
//   }
// );

import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count
}) => {
  const dispatch = useDispatch(); // Инициализируйте dispatch
  const location = useLocation();

  const handleAdd = () => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
};
