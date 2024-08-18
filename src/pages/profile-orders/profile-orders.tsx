import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders, selectorOrders } from '../../services/slices/orders';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectorOrders);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
