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

import { FC, memo, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoading
} from '../../services/slices/ingridientsSlice';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '../../utils/types';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    // Обработка добавления ингредиента
    const handleAdd = () => {
      // Реализация добавления ингредиента
    };

    const dispatch: AppDispatch = useDispatch();

    const ingredients = useSelector(selectIngredients);
    const isLoading = useSelector(selectIsLoading);

    const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
    const titleBunRef = useRef<HTMLHeadingElement>(null);
    const titleMainRef = useRef<HTMLHeadingElement>(null);
    const titleSauceRef = useRef<HTMLHeadingElement>(null);

    const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
    const [mainRef, inViewFilling] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauces] = useInView({ threshold: 0 });

    useEffect(() => {
      dispatch(fetchIngredients()); // Запрашиваем данные при загрузке компонента
    }, [dispatch]);

    useEffect(() => {
      if (inViewBuns) {
        setCurrentTab('bun');
      } else if (inViewSauces) {
        setCurrentTab('sauce');
      } else if (inViewFilling) {
        setCurrentTab('main');
      }
    }, [inViewBuns, inViewSauces, inViewFilling]);

    const onTabClick = (tab: TTabMode) => {
      setCurrentTab(tab);
      if (tab === 'bun') {
        titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'main') {
        titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'sauce') {
        titleSauceRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Данные ингредиентов разделены на категории
    const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
    const mains = ingredients.filter(
      (ingredient) => ingredient.type === 'main'
    );
    const sauces = ingredients.filter(
      (ingredient) => ingredient.type === 'sauce'
    );

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
