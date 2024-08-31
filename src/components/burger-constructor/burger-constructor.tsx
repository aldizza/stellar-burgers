import { FC, useMemo, useEffect } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  createOrderBurger,
  selectorBurgerIngredients,
  closeOrderModalData
} from '../../services/slices/burgerConstructor';
import {
  selectorOrderStatus,
  resetCreateOrder
} from '../../services/slices/order';
import { selectorModalData } from '../../services/slices/burgerConstructor';
import { getIsAuthChecked } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthChecked);
  const constructorItems = useSelector(selectorBurgerIngredients);
  const orderRequest =
    useSelector(selectorOrderStatus) === RequestStatus.Loading;
  const orderModalData = useSelector(selectorModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
    } else {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ];
      dispatch(createOrderBurger(ingredientIds));
    }
  };
  
  const closeOrderModal = () => {
    dispatch(resetCreateOrder());
    dispatch(clearConstructor());
    dispatch(closeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
