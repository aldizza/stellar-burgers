import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, RequestStatus } from '../../utils/types';
import { TRegisterData, TLoginData } from '../../utils/burger-api';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TUserResponse
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// Тип состояния пользователя (QA)
type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
};

// Начальное состояние
export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

// Экшен для проверки авторизации пользователя
export const checkUserAuth = createAsyncThunk<
  TUser,
  void,
  { rejectValue: any }
>('user/checkUserAuth', async (_, { rejectWithValue }) => {
  try {
    const response: TUserResponse = await getUserApi();
    if (response.success) {
      return response.user; // Возвращаем user напрямую
    } else {
      return rejectWithValue('Failed to fetch user');
    }
  } catch (err) {
    return rejectWithValue(err);
  }
});

// Экшен для входа пользователя
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

// Экшен для регистрации пользователя
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

// Экшен для выхода пользователя
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

// Экшен для обновления данных пользователя
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

// Создание слайса пользователя
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        checkUserAuth.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.data = action.payload;
          state.isAuthChecked = true;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Failed;
        state.data = null;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isAuthChecked = true;
          state.data = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.data = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
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
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isAuthChecked = true;
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuthChecked = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.requestStatus = RequestStatus.Idle;
      });
  },
  selectors: {
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked,
    getUser: (state: TUserState) => state.data,
    selectorRequestStatus: (state: TUserState) => state.requestStatus,
    getName: (state: TUserState) => state.data?.name || ''
  }
});

export const { getIsAuthChecked, getUser, selectorRequestStatus, getName } =
  userSlice.selectors;

export const { authCheck } = userSlice.actions;
export default userSlice.reducer;
export const userReducer = userSlice.reducer;

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

//Помогал Вова

// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TUser, RequestStatus } from '@utils-types';
// import { TRegisterData, TLoginData } from '../../utils/burger-api';
// import {
//   registerUserApi,
//   loginUserApi,
//   getUserApi,
//   updateUserApi,
//   logoutApi,
//   TUserResponse
// } from '../../utils/burger-api';
// import { setCookie, deleteCookie } from '../../utils/cookie';

// // Тип состояния пользователя (QA)
// type TUserState = {
//   isAuthChecked: boolean;
//   data: TUser | null;
//   requestStatus: RequestStatus;
// };

// // Начальное состояние
// export const initialState: TUserState = {
//   isAuthChecked: false,
//   data: null,
//   requestStatus: RequestStatus.Idle
// };

// // Экшен для проверки авторизации пользователя
// export const checkUserAuth = createAsyncThunk<
//   TUser,
//   void,
//   { rejectValue: any }
// >('user/checkUserAuth', async (_, { rejectWithValue }) => {
//   try {
//     const response: TUserResponse = await getUserApi();
//     if (response.success) {
//       return response.user; // Возвращаем user напрямую
//     } else {
//       return rejectWithValue('Failed to fetch user');
//     }
//   } catch (err) {
//     return rejectWithValue(err);
//   }
// });

// // Экшен для входа пользователя
// export const loginUser = createAsyncThunk(
//   'user/login',
//   async (loginData: TLoginData, { rejectWithValue }) => {
//     try {
//       const response = await loginUserApi(loginData);
//       setCookie('accessToken', response.accessToken);
//       localStorage.setItem('refreshToken', response.refreshToken);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Экшен для регистрации пользователя
// export const registerUser = createAsyncThunk(
//   'user/register',
//   async (registerData: TRegisterData, { rejectWithValue }) => {
//     try {
//       const response = await registerUserApi(registerData);
//       setCookie('accessToken', response.accessToken);
//       localStorage.setItem('refreshToken', response.refreshToken);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Экшен для выхода пользователя
// export const logoutUser = createAsyncThunk(
//   'user/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutApi();
//       deleteCookie('accessToken');
//       localStorage.removeItem('refreshToken');
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Экшен для обновления данных пользователя
// export const updateUser = createAsyncThunk(
//   'user/update',
//   async (data: Partial<TRegisterData>, { rejectWithValue }) => {
//     try {
//       const response = await updateUserApi(data);
//       return response.user;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// // Создание слайса пользователя
// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     // authCheck(state) {
//     //   state.isAuthChecked = true;
//     // }
//     authCheck(state, action: PayloadAction<boolean>) {
//       state.isAuthChecked = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(
//         checkUserAuth.fulfilled,
//         (state, action: PayloadAction<TUser>) => {
//           state.data = action.payload;
//           state.isAuthChecked = true;
//           state.requestStatus = RequestStatus.Success;
//         }
//       )
//       .addCase(checkUserAuth.rejected, (state) => {
//         state.isAuthChecked = false;
//         state.requestStatus = RequestStatus.Failed;
//         state.data = null;
//       })
//       .addCase(checkUserAuth.pending, (state) => {
//         state.requestStatus = RequestStatus.Loading;
//       })
//       .addCase(
//         registerUser.fulfilled,
//         (state, action: PayloadAction<TUser>) => {
//           state.isAuthChecked = true;
//           state.data = action.payload;
//           state.requestStatus = RequestStatus.Success;
//         }
//       )
//       .addCase(registerUser.rejected, (state) => {
//         state.requestStatus = RequestStatus.Failed;
//         state.data = null;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.requestStatus = RequestStatus.Loading;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
//         state.requestStatus = RequestStatus.Success;
//         state.data = action.payload;
//         state.isAuthChecked = true;
//       })
//       .addCase(loginUser.rejected, (state) => {
//         state.requestStatus = RequestStatus.Failed;
//         state.data = null;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.requestStatus = RequestStatus.Loading;
//       })
//       .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
//         state.isAuthChecked = true;
//         state.data = action.payload;
//         state.requestStatus = RequestStatus.Success;
//       })
//       .addCase(updateUser.rejected, (state) => {
//         state.isAuthChecked = false;
//         state.requestStatus = RequestStatus.Failed;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.requestStatus = RequestStatus.Loading;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.data = null;
//         state.isAuthChecked = false;
//         state.requestStatus = RequestStatus.Idle;
//       });
//   },
//   selectors: {
//     getIsAuthChecked: (state: TUserState) => state.isAuthChecked,
//     getUser: (state: TUserState) => state.data,
//     selectorRequestStatus: (state: TUserState) => state.requestStatus,
//     getName: (state: TUserState) => state.data?.name || ''
//   }
// });

// export const { getIsAuthChecked, getUser, selectorRequestStatus, getName } =
//   userSlice.selectors;
// export const { authCheck } = userSlice.actions;
// export default userSlice.reducer;
