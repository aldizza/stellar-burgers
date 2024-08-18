import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/user';
import { RootState } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(
    (state: RootState) => getUser(state)?.name || ''
  );
  return <AppHeaderUI userName={userName} />;
};
