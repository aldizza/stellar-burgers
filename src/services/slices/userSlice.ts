import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types'; // Обновляем импорт

type TUserState = {
  user: TUser | null; // Обновляем тип состояния пользователя
  isLoading: boolean;
  hasError: boolean;
  isInitialized: boolean;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  hasError: false,
  isInitialized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    updateUser: (state, action: PayloadAction<TUser>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    }
  }
});

export const {
  setUser,
  setLoading,
  setError,
  logout,
  setInitialized,
  updateUser
} = userSlice.actions;
export default userSlice.reducer;
