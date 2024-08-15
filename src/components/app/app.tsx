//Стартер

// import { ConstructorPage } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';

// import { AppHeader } from '@components';

// const App = () => (
//   <div className={styles.app}>
//     <AppHeader />
//     <ConstructorPage />
//   </div>
// );

// export default App;

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  // Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
// import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredients';
import { getUser, selectorRequestStatus } from '../../services/slices/user';
import { getCookie } from '../../utils/cookie';
import { selectorisAuthChecked, authCheck } from '../../services/slices/user';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const atoken = getCookie('accessToken');


  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            // <ProtectedRoute onlyUnAuth>
            <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            // <ProtectedRoute onlyUnAuth>
            <Register />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            // <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            // <ProtectedRoute onlyUnAuth>
            <ResetPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            // <ProtectedRoute>
            <ProfileOrders />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            // <ProtectedRoute>
            <OrderInfo />
            // </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                {/* <ProtectedRoute> */}
                <OrderInfo />
                {/* </ProtectedRoute> */}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
