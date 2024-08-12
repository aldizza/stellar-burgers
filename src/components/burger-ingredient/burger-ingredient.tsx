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

//промежуточный вариант
// import { FC } from 'react';
// import { useLocation } from 'react-router-dom';
// import { BurgerIngredientUI } from '@ui';
// import { TBurgerIngredientProps } from './type';

// export const BurgerIngredient: FC<TBurgerIngredientProps> = ({ ingredient, count }) => {
//   const location = useLocation(); // Получаем текущую локацию

//   const handleAdd = () => {
//     // Добавить код для обработки добавления ингредиента
//   };

//   return (
//     <BurgerIngredientUI
//       ingredient={ingredient}
//       count={count}
//       locationState={{ background: location }} // Передаем `locationState` как ожидается
//       handleAdd={handleAdd}
//     />
//   );
// };

import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location }
    });
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
