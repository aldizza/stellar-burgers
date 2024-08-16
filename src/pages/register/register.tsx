//Полностью готов
//Стартер

// import { FC, SyntheticEvent, useState } from 'react';
// import { RegisterUI } from '@ui-pages';

// export const Register: FC = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <RegisterUI
//       errorText=''
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

//Промежуточный вариант

// import { FC, SyntheticEvent, useState } from 'react';
// import { RegisterUI } from '@ui-pages';
// import { useDispatch } from '../../services/store';
// import { TRegisterData } from '@api';
// import { registerUser } from '../../services/slices/user';

// export const Register: FC = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     const userData: TRegisterData = {
//       email: email,
//       name: userName,
//       password: password
//     };

//     dispatch(registerUser(userData));
//   };

//   return (
//     <RegisterUI
//       errorText=''
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { TRegisterData } from '@api';
import { registerUser } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };

    dispatch(registerUser(userData)).then(() => {
      navigate('/'); // Перенаправление на страницу конструктора бургера
    });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};



