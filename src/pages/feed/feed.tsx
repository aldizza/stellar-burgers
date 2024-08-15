// Полностью готова

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
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds, selectorFeedOrders } from '../../services/slices/feed';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorFeedOrders);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return null;
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
