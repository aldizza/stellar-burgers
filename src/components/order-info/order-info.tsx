//Стартер

//import { FC, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';

// export const OrderInfo: FC = () => {
//   /** TODO: взять переменные orderData и ingredients из стора */
//   const orderData = {
//     createdAt: '',
//     ingredients: [],
//     _id: '',
//     status: '',
//     name: '',
//     updatedAt: 'string',
//     number: 0
//   };

//   const ingredients: TIngredient[] = [];

//   /* Готовим данные для отображения */
//   const orderInfo = useMemo(() => {
//     if (!orderData || !ingredients.length) return null;

//     const date = new Date(orderData.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = orderData.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...orderData,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [orderData, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };

// import { FC, useMemo, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../services/store';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { selectorOrderData } from '../../services/slices/orderSlise';
// import { ordersSlice } from '../../services/slices/ordersSlice'; // Импортируем Thunk-функцию

//Полностью готов, можно потом const OrderInfo

import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  selectorModalData
} from '../../services/slices/order';
import { selectorIngredientsData } from '../../services/slices/ingredients';

//C QA
export const OrderInfo: FC = () => {
  const number = useParams().number || '';
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector(selectorIngredientsData);

  const orderData = useSelector(selectorModalData);

  // Загрузка данных заказа при монтировании компонента
  //Если заказа в сторе нет, то запрашиваем его
  useEffect(() => {
    dispatch(getOrderByNumber(+number));
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
