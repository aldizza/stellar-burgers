// стартер Я.Практикум

// import { FC, useMemo } from 'react';
// import { TConstructorIngredient } from '@utils-types';
// import { BurgerConstructorUI } from '@ui';

// export const BurgerConstructor: FC = () => {
//   /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
//   const constructorItems = {
//     bun: {
//       price: 0
//     },
//     ingredients: []
//   };

//   const orderRequest = false;

//   const orderModalData = null;

//   const onOrderClick = () => {
//     if (!constructorItems.bun || orderRequest) return;
//   };
//   const closeOrderModal = () => {};

//   const price = useMemo(
//     () =>
//       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
//       constructorItems.ingredients.reduce(
//         (s: number, v: TConstructorIngredient) => s + v.price,
//         0
//       ),
//     [constructorItems]
//   );

//   return null;

//   return (
//     <BurgerConstructorUI
//       price={price}
//       orderRequest={orderRequest}
//       constructorItems={constructorItems}
//       orderModalData={orderModalData}
//       onOrderClick={onOrderClick}
//       closeOrderModal={closeOrderModal}
//     />
//   );
// };

import { FC, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, AppDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/constructorBurgerSlice';
import { Modal } from '../modal/modal'; // Импортируем компонент Modal

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  // Получение данных из стора
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );
  const isLoading = useSelector(
    (state: RootState) => state.burgerConstructor.isLoading
  );
  const hasError = useSelector(
    (state: RootState) => state.burgerConstructor.hasError
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    setIsModalOpen(true); // Открываем модальное окно
  };

  const closeOrderModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (hasError) {
    return <div>Ошибка загрузки ингредиентов</div>;
  }

  return (
    <>
      <BurgerConstructorUI
        price={price}
        orderRequest={orderRequest}
        constructorItems={{ bun, ingredients }} // Передаем данные конструкторов
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
      />
      {isModalOpen && (
        <Modal title='Ваш заказ' onClose={closeOrderModal}>
          {/* Содержимое модального окна */}
          <p>
            Ваш заказ: {bun && bun.name} и{' '}
            {ingredients.map((ing) => ing.name).join(', ')}
          </p>
        </Modal>
      )}
    </>
  );
};
