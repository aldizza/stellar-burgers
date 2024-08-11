//Стартер

// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';

// export const Feed: FC = () => {
//   /** TODO: взять переменную из стора */
//   const orders: TOrder[] = [];

//   if (!orders.length) {
//     return <Preloader />;
//   }

//   <FeedUI orders={orders} handleGetFeeds={() => {}} />;
// };

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store'; // Импортируйте тип RootState
import { getFeedsApi } from '../../utils/burger-api'; // Импортируйте функцию для получения данных

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.orders.isLoading
  );

  // Функция для получения данных при монтировании компонента
  const handleGetFeeds = async () => {
    try {
      dispatch({ type: 'orders/setLoading', payload: true }); // Устанавливаем загрузку в true
      const feeds = await getFeedsApi();
      dispatch({ type: 'orders/setOrders', payload: feeds.orders }); // Сохраняем заказы в store
    } catch (error) {
      console.error('Failed to fetch feeds:', error);
    } finally {
      dispatch({ type: 'orders/setLoading', payload: false }); // Устанавливаем загрузку в false
    }
  };

  // Если данные загружаются, показываем прелоадер
  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
