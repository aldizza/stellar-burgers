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
  selectorOrderData
} from '../../services/slices/orderSlise';
import { selectIngredientsData } from '../../services/slices/ingridientsSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  // Загрузка данных заказа при монтировании компонента
  useEffect(() => {
    dispatch(getOrderByNumber(orderNumber));
  }, []);

  const orderData = useSelector(selectorOrderData);
  const ingredients: TIngredient[] = useSelector(selectIngredientsData);

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

// export const OrderInfo: FC = () => {
//   const dispatch = useDispatch();

//   // Получаем данные заказа и ингредиентов из Redux стора
//   const { info: orderData, status } = useSelector((state: RootState) => state.order);
//   const ingredients = useSelector((state: RootState) => state.ingredients.items); // Путь к вашему состоянию ингредиентов

//   // Загрузка данных заказа при монтировании компонента
//   useEffect(() => {
//     // Замените номер заказа на нужный вам
//     const orderNumber = 123;
//     dispatch(fetchOrderByNumber(orderNumber));
//   }, [dispatch]);

//   // Подготовка данных для отображения
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

//   if (status === 'Loading') {
//     return <Preloader />;
//   }

//   if (!orderInfo) {
//     return <div>Заказ не найден</div>;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };

// export const OrderInfo: FC = () => {
//   const dispatch: AppDispatch = useDispatch();

//   // Получаем данные заказа и ингредиенты из состояния Redux
//   const orderData = useSelector(selectorOrderData);
//   const ingredients: TIngredient[] = useSelector(
//     (state: RootState) => state.ingredients.ingredients
//   );
//   const isLoading = useSelector((state: RootState) => state.orders.isLoading);
//   const hasError = useSelector((state: RootState) => state.orders.hasError);

//   useEffect(() => {
//     // Вызов Thunk-функции для получения данных заказа
//     dispatch(ordersSlice(orderNumber));
//   }, [dispatch]);

//   // Подготавливаем данные для отображения
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

//   if (isLoading) {
//     return <Preloader />;
//   }

//   if (hasError) {
//     return <div>Ошибка при загрузке данных заказа</div>;
//   }

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };
