export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

//возможные режимы или состояния вкладок для переключения между различными категориями ингредиентов
export type TTabMode = 'bun' | 'sauce' | 'main';

// Определение типа состояния конструктора бургера
//Должен содердать информацию об ингридиентах в конструкторе
export type TConstructorState = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

// Тип для булочки (TBun)
export type TBun = TIngredient;

//Тип для состояние ингредиентов
export type TIngredientState = {
  buns: TIngredient[]; // Массив булочек
  mains: TIngredient[]; // Массив основных ингредиентов
  sauces: TIngredient[]; // Массив соусов
};

//Тип для статуса запроса
// export type RequestStatus = 'Idle' | 'Loading' | 'Success' | 'Failed';
//или
//Тип для статуса запроса
export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type TLoginData = {
  email: string;
  password: string;
};
