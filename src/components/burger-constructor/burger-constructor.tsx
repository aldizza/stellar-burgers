//Стартер

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

import { FC, useMemo } from 'react';
import { TConstructorIngredient, RequestStatus } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getOrderByNumber,
  selectorModalData,
  selectorOrderStatus,
  resetOrder
} from '../../services/slices/order';
import { selectorisAuthChecked } from '../../services/slices/user';
import {
  orderBurger,
  clearConstructor,
  selectorConstructorItems
} from '../../services/slices/burgerConstructor';
import { RootState } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorisAuthChecked);
  const constructorItems = useSelector(selectorConstructorItems);
  const orderRequest =
    useSelector(selectorOrderStatus) === RequestStatus.Loading;
  const orderModalData = useSelector(selectorModalData);

  // const onOrderClick = () => {
  //   if (!isAuth) {
  //     // return navigate('/login');
  //     return;
  //   }

  //   if (!constructorItems.bun || orderRequest) return;
  //   // console.log('No bun or request in progress');

  //   const orderList = [
  //     constructorItems.bun._id,
  //     ...constructorItems.ingredients.map((item) => item._id)
  //   ];

  //   dispatch(orderBurger(orderList));
  // };

  const onOrderClick = () => {
    if (!isAuth) {
      // return navigate('/login');
      return;
    }
  
    if (!constructorItems.bun || orderRequest) return;
  
    const orderList = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];
  
    dispatch(orderBurger({ ingredients: orderList }));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
    navigate('/');
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
