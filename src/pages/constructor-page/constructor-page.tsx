//Стартер

// import { useSelector } from '../../services/store';

// import styles from './constructor-page.module.css';

// import { BurgerIngredients } from '../../components';
// import { BurgerConstructor } from '../../components';
// import { Preloader } from '../../components/ui';
// import { FC } from 'react';

// export const ConstructorPage: FC = () => {
//   /** TODO: взять переменную из стора */
//   const isIngredientsLoading = false;

//   return (
//     <>
//       {isIngredientsLoading ? (
//         <Preloader />
//       ) : (
//         <main className={styles.containerMain}>
//           <h1
//             className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
//           >
//             Соберите бургер
//           </h1>
//           <div className={`${styles.main} pl-5 pr-5`}>
//             <BurgerIngredients />
//             <BurgerConstructor />
//           </div>
//         </main>
//       )}
//     </>
//   );
// };

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  // Получаем состояние загрузки ингредиентов из Redux
  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );

  return (
    <>
      {isIngredientsLoading ? (
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
