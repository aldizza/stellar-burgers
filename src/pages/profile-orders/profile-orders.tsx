//Стартер

// import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';

// export const ProfileOrders: FC = () => {
//   /** TODO: взять переменную из стора */
//   const orders: TOrder[] = [];

//   return <ProfileOrdersUI orders={orders} />;
// };

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders, selectOrders } from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/userSlice';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, [user, dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
