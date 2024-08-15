//Не уверена насчет санок, уточнить у наставника

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, RequestStatus } from '@utils-types';
import { TRegisterData, TLoginData } from '../../utils/burger-api';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean; //Если не авторизован и запрашиваешь защищенный компонент, его не отдаст
  data: TUser | null;
  requestStatus: RequestStatus;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

//экшен, который отправляет запрос к серверу, чтобы проверить, авторизован ли пользователь, и, если да, получить его данные
export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(registerData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck(state, action) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.data = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.data = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Idle;
      });
  },
  selectors: {
    selectorisAuthChecked: (state: TUserState) => state.isAuthChecked,
    getUser: (state: TUserState) => state.data,

    getName: (state: TUserState) => state.data?.name || '',
    selectorRequestStatus: (state: TUserState) => state.requestStatus
  }
});

export const {
  selectorisAuthChecked,
  getUser,
  getName,
  selectorRequestStatus
} = userSlice.selectors;

export const { authCheck } = userSlice.actions;

export default userSlice.reducer;

//Из QA 58.55
//   .addCase(isActionPending(USER_SLICE_NAME), state => {
//   state.requestStatus = RequestStatus.Loading;
// })

//C QA
// export const userSlice = createSlice({
//     name: USER_SLICE_NAME,
//     initialState,
//     reducers: {
//       authCheck: state => {
//       },
//     },
//     extraReducers: builder => {
//     },
//     selectors:
//       getUser: (state:TUserState) => StaticRange.data,
//       getIsAuthChecked: (state:TUserState) => state.isAuthChecked,
//     }
// });
