//Полностью готов
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../services/slices/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    // Выполняем экшен loginUser и после успешного логина перенаправляем на главную страницу
    dispatch(loginUser({ email, password })).then(() => {
      navigate('/'); // Перенаправление на страницу конструктора бургера
    });

    setPassword(''); // Очищаем поле пароля после отправки формы
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

