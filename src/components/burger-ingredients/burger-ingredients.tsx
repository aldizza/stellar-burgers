//стартер

// import { useState, useRef, useEffect, FC } from 'react';
// import { useInView } from 'react-intersection-observer';

// import { TTabMode } from '@utils-types';
// import { BurgerIngredientsUI } from '../ui/burger-ingredients';

// export const BurgerIngredients: FC = () => {
//   /** TODO: взять переменные из стора */
//   const buns = [];
//   const mains = [];
//   const sauces = [];

//   const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
//   const titleBunRef = useRef<HTMLHeadingElement>(null);
//   const titleMainRef = useRef<HTMLHeadingElement>(null);
//   const titleSaucesRef = useRef<HTMLHeadingElement>(null);

//   const [bunsRef, inViewBuns] = useInView({
//     threshold: 0
//   });

//   const [mainsRef, inViewFilling] = useInView({
//     threshold: 0
//   });

//   const [saucesRef, inViewSauces] = useInView({
//     threshold: 0
//   });

//   useEffect(() => {
//     if (inViewBuns) {
//       setCurrentTab('bun');
//     } else if (inViewSauces) {
//       setCurrentTab('sauce');
//     } else if (inViewFilling) {
//       setCurrentTab('main');
//     }
//   }, [inViewBuns, inViewFilling, inViewSauces]);

//   const onTabClick = (tab: string) => {
//     setCurrentTab(tab as TTabMode);
//     if (tab === 'bun')
//       titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
//     if (tab === 'main')
//       titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
//     if (tab === 'sauce')
//       titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <BurgerIngredientsUI
//       currentTab={currentTab}
//       buns={buns}
//       mains={mains}
//       sauces={sauces}
//       titleBunRef={titleBunRef}
//       titleMainRef={titleMainRef}
//       titleSaucesRef={titleSaucesRef}
//       bunsRef={bunsRef}
//       mainsRef={mainsRef}
//       saucesRef={saucesRef}
//       onTabClick={onTabClick}
//     />
//   );
// };

import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { TTabMode, TIngredientState } from '../../utils/types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoading,
  selectHasError
} from '../../services/slices/ingridientsSlice';

export const BurgerIngredients: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

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
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Данные ингредиентов разделены по категориям
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
