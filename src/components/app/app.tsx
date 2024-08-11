/* eslint-disable */


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
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  // ProtectedRoute,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';

import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchIngredients } from '../../services/slices/ingridientsSlice';

import { AppDispatch } from '../../services/store'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalClose = () => {
    navigate(-1);
  };
  const backgroundLocation = location.state?.backgroundLocation;

const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
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
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиентов' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              // <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              // </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
