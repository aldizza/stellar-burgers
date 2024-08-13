//яяяяяяя

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

//Полностью сделано
//Можно потом переделать onOrderClick

import { FC, useMemo } from 'react';
import { TConstructorIngredient, RequestStatus } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  orderBurger,
  clearConstructor,
  selectConstructorsItems,
  selectConstructorsRequest,
  selectConstructorsOrder
} from '../../services/slices/burgerConstructorSlice';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const constructorItems = useSelector(selectConstructorsItems);

  const orderRequest =
    useSelector(selectConstructorsRequest) === RequestStatus.Loading;

  const orderModalData = useSelector(selectConstructorsOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ];
      dispatch(orderBurger(ingredientIds));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
