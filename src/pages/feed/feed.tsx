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
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds, selectFeedOrders } from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  // Типизируйте dispatch как AppDispatch
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);

  useEffect(() => {
    // Теперь dispatch будет корректно типизирован для работы с AsyncThunk
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return null;
    // return <Preloader />;
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
