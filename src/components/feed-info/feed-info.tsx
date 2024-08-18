//Лента заказов
//Полностью готов
//Стартер

// import { FC } from 'react';

// import { TOrder } from '@utils-types';
// import { FeedInfoUI } from '../ui/feed-info';

// const getOrders = (orders: TOrder[], status: string): number[] =>
//   orders
//     .filter((item) => item.status === status)
//     .map((item) => item.number)
//     .slice(0, 20);

// export const FeedInfo: FC = () => {
//   /** TODO: взять переменные из стора */
//   const orders: TOrder[] = [];
//   const feed = {};

//   const readyOrders = getOrders(orders, 'done');

//   const pendingOrders = getOrders(orders, 'pending');

//   return (
//     <FeedInfoUI
//       readyOrders={readyOrders}
//       pendingOrders={pendingOrders}
//       feed={feed}
//     />
//   );
// };

import { FC, useCallback } from 'react';
import { useDispatch } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectorFeedOrders,
  selectorFeedTotal,
  selectorFeedTotalToday,
  getFeeds
} from '../../services/slices/feed';
import { useSelector } from '../../services/store';

//!!!!!!пропс для обновления заказов в ленте
interface FeedInfoProps {
  handleGetFeeds: () => void;
}

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectorFeedOrders);
  const totalFeeds = useSelector(selectorFeedTotal);
  const totalToday = useSelector(selectorFeedTotalToday);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');
  const dispatch = useDispatch();

  // Функция для обновления ленты заказов
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{
        total: totalFeeds,
        totalToday: totalToday
      }}
      // handleGetFeeds={handleGetFeeds}
    />
  );
};
