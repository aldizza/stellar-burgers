import React, { FC, memo } from 'react';
import { Tab } from '@zlden/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategory } from '@components';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
  ({
    currentTab,
    buns,
    mains,
    sauces,
    titleBunRef,
    titleMainRef,
    titleSaucesRef,
    bunsRef,
    mainsRef,
    saucesRef,
    onTabClick
  }) => (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab
              value='main'
              active={currentTab === 'main'}
              onClick={onTabClick}
            >
              Начинки
            </Tab>
            <Tab
              value='sauce'
              active={currentTab === 'sauce'}
              onClick={onTabClick}
            >
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content}>
          <IngredientsCategory
            title='Булки'
            titleRef={titleBunRef}
            ingredients={buns}
            ref={bunsRef}
          />
          <IngredientsCategory
            title='Начинки'
            titleRef={titleMainRef}
            ingredients={mains}
            ref={mainsRef}
          />
          <IngredientsCategory
            title='Соусы'
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ref={saucesRef}
          />
        </div>
      </section>
    </>
  )
);

//Для тестов cypress
// import React, { FC, memo } from 'react';
// import { Tab } from '@zlden/react-developer-burger-ui-components';

// import styles from './burger-ingredients.module.css';
// import { BurgerIngredientsUIProps } from './type';
// import { IngredientsCategory } from '@components';

// export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = memo(
//   ({
//     currentTab,
//     buns,
//     mains,
//     sauces,
//     titleBunRef,
//     titleMainRef,
//     titleSaucesRef,
//     bunsRef,
//     mainsRef,
//     saucesRef,
//     onTabClick
//   }) => (
//     <>
//       <section className={styles.burger_ingredients}>
//         <nav>
//           <ul className={styles.menu}>
//             <Tab value='bun' active={currentTab === 'bun'} onClick={onTabClick} data-cy="bun-ingredients">
//               Булки
//             </Tab>
//             <Tab
//               value='main'
//               active={currentTab === 'main'}
//               onClick={onTabClick}
//               data-cy="mains-ingredients"
//             >
//               Начинки
//             </Tab>
//             <Tab
//               value='sauce'
//               active={currentTab === 'sauce'}
//               onClick={onTabClick}
//               data-cy="sauces-ingredients"
//             >
//               Соусы
//             </Tab>
//           </ul>
//         </nav>
//         <div className={styles.content}>
//           <IngredientsCategory
//             title='Булки'
//             titleRef={titleBunRef}
//             ingredients={buns}
//             ref={bunsRef}
//             data-cy="bun-category"
//           />
//           <IngredientsCategory
//             title='Начинки'
//             titleRef={titleMainRef}
//             ingredients={mains}
//             ref={mainsRef}
//             data-cy="mains-category"
//           />
//           <IngredientsCategory
//             title='Соусы'
//             titleRef={titleSaucesRef}
//             ingredients={sauces}
//             ref={saucesRef}
//             data-cy="sauces-category"
//           />
//         </div>
//       </section>
//     </>
//   )
// );
