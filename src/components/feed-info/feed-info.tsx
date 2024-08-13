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

//Лента заказов

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
// import { selectFeed } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);
  const feed = useSelector((state: RootState) => state.feed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
