//стартер

// import { FC, memo } from 'react';
// import { BurgerConstructorElementUI } from '@ui';
// import { BurgerConstructorElementProps } from './type';

// export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
//   ({ ingredient, index, totalItems }) => {
//     const handleMoveDown = () => {};

//     const handleMoveUp = () => {};

//     const handleClose = () => {};

//     return (
//       <BurgerConstructorElementUI
//         ingredient={ingredient}
//         index={index}
//         totalItems={totalItems}
//         handleMoveUp={handleMoveUp}
//         handleMoveDown={handleMoveDown}
//         handleClose={handleClose}
//       />
//     );
//   }
// );



//Мой вариант с неработающей модалкой

// import { FC, memo } from 'react';
// import { BurgerConstructorElementUI } from '@ui';
// import { BurgerConstructorElementProps } from './type';
// import { useSelector, useDispatch } from '../../services/store';
// import {
//   selectorConstructorItems,
//   removeIngredient,
//   updateConstructor
// } from '../../services/slices/burgerConstructor';
// import { TConstructorIngredient } from '@utils-types';

// export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
//   ({ ingredient, index, totalItems }) => {
//     const dispatch = useDispatch();
//     const constructorItems = useSelector(selectorConstructorItems);

//     function swapElements(
//       state: TConstructorIngredient[],
//       index: number,
//       step: number
//     ) {
//       const copy = [...state];
//       copy[index] = copy.splice(index + step, 1, copy[index])[0];
//       return copy;
//     }

//     const handleMoveDown = () => {
//       dispatch(
//         updateConstructor(swapElements(constructorItems.ingredients, index, 1))
//       );
//     };

//     const handleMoveUp = () => {
//       dispatch(
//         updateConstructor(swapElements(constructorItems.ingredients, index, -1))
//       );
//     };

//     const handleClose = () => {
//       dispatch(removeIngredient(ingredient));
//     };

//     return (
//       <BurgerConstructorElementUI
//         ingredient={ingredient}
//         index={index}
//         totalItems={totalItems}
//         handleMoveUp={handleMoveUp}
//         handleMoveDown={handleMoveDown}
//         handleClose={handleClose}
//       />
//     );
//   }
// );



//Исправленный вариант после правок слайса конструктора (после видео наставника 16/08)
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectorBurgerIngredients,
  removeIngredient,
  updateConstructor
} from '../../services/slices/burgerConstructor';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(selectorBurgerIngredients);

    function swapElements(
      state: TConstructorIngredient[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const handleMoveDown = () => {
      dispatch(
        updateConstructor(swapElements(constructorItems.ingredients, index, 1))
      );
    };

    const handleMoveUp = () => {
      dispatch(
        updateConstructor(swapElements(constructorItems.ingredients, index, -1))
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

