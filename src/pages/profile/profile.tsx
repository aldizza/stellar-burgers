// //Полностью готов

// import { ProfileUI } from '@ui-pages';
// import { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from '../../services/store';
// import { getUser, updateUser } from '../../services/slices/user';

// export const Profile: FC = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(getUser);

//   const [formValue, setFormValue] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   const [isFormChanged, setIsFormChanged] = useState(false);

//   useEffect(() => {
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//     setIsFormChanged(false); // Сбрасываем флаг изменения формы после обновления пользователя
//   }, [user]);

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     if (isFormChanged && user) {
//       // Проверяем, что user не null
//       dispatch(updateUser(formValue)); // Отправляем экшен для обновления пользователя
//     }
//   };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//     setIsFormChanged(false); // Сбрасываем флаг изменения формы
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//     setIsFormChanged(true); // Устанавливаем флаг изменения формы при изменении любого поля
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   );
// };

import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, updateUser } from '../../services/slices/user';
import { TUser } from '@utils-types';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser(formValue));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
