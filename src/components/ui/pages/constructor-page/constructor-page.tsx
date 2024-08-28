import { useSelector } from '../../../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';

import { ConstructorPageUIProps } from './type';
import { selectorIngredientsLoading } from '../../../../services/slices/ingredients';
import { RequestStatus } from '@utils-types';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = () => {
  const isIngredientsLoading = useSelector(selectorIngredientsLoading);

  return (
    <>
      {isIngredientsLoading === RequestStatus.Loading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
