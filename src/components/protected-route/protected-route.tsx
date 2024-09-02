import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuthChecked, getUser } from '../../services/slices/user';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();
  const user = useSelector(getUser);
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};

//Помогал Вова
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from '../../services/store';
// import { getIsAuthChecked, getUser } from '../../services/slices/user';
// import { Preloader } from '../ui/preloader';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth = false,
//   children
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(getIsAuthChecked);
//   const location = useLocation();
//   // const user = useSelector(getUser);
//   // if (!isAuthChecked) {
//   //   return <Preloader />;
//   // }

//   // if (!onlyUnAuth && !user) {
//   if (!onlyUnAuth && !isAuthChecked) {
//     return <Navigate replace to='/login' state={{ from: location }} />;
//   }

//   // if (onlyUnAuth && user) {
//   if (onlyUnAuth && isAuthChecked) {
//     const fromPage = location.state?.from || { pathname: '/' };

//     return <Navigate replace to={fromPage} />;
//   }
//   return children;
// };
