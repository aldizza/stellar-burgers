import userReducer, {
  authCheck,
  initialState,
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from '../services/slices/user';
import { TUser, RequestStatus } from '@utils-types';

// Пример пользователя для тестов
const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice reducer', () => {
  it('должен корректно обрабатывать initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен корректно обрабатывать authCheck', () => {
    const actual = userReducer(initialState, authCheck());
    expect(actual.isAuthChecked).toEqual(true);
  });

  it('должен корректно обрабатывать checkUserAuth.fulfilled', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    };
    const actual = userReducer(initialState, action);
    expect(actual.data).toEqual(mockUser);
    expect(actual.isAuthChecked).toEqual(true);
    expect(actual.requestStatus).toEqual(RequestStatus.Success);
  });

  it('должен корректно обрабатывать checkUserAuth.rejected', () => {
    const action = { type: checkUserAuth.rejected.type };
    const actual = userReducer(initialState, action);
    expect(actual.data).toBeNull();
    expect(actual.isAuthChecked).toEqual(false);
    expect(actual.requestStatus).toEqual(RequestStatus.Failed);
  });

  it('должен корректно обрабатывать checkUserAuth.pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const actual = userReducer(initialState, action);
    expect(actual.requestStatus).toEqual(RequestStatus.Loading);
  });

  it('должен корректно обрабатывать loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const actual = userReducer(initialState, action);
    expect(actual.data).toEqual(mockUser);
    expect(actual.isAuthChecked).toEqual(true);
    expect(actual.requestStatus).toEqual(RequestStatus.Success);
  });

  it('должен корректно обрабатывать loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type };
    const actual = userReducer(initialState, action);
    expect(actual.data).toBeNull();
    expect(actual.requestStatus).toEqual(RequestStatus.Failed);
  });

  it('должен корректно обрабатывать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const actual = userReducer(initialState, action);
    expect(actual.requestStatus).toEqual(RequestStatus.Loading);
  });

  it('должен корректно обрабатывать registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const actual = userReducer(initialState, action);
    expect(actual.data).toEqual(mockUser);
    expect(actual.isAuthChecked).toEqual(true);
    expect(actual.requestStatus).toEqual(RequestStatus.Success);
  });

  it('должен корректно обрабатывать registerUser.rejected', () => {
    const action = { type: registerUser.rejected.type };
    const actual = userReducer(initialState, action);
    expect(actual.data).toBeNull();
    expect(actual.requestStatus).toEqual(RequestStatus.Failed);
  });

  it('должен корректно обрабатывать registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const actual = userReducer(initialState, action);
    expect(actual.requestStatus).toEqual(RequestStatus.Loading);
  });

  it('должен корректно обрабатывать updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const actual = userReducer(initialState, action);
    expect(actual.data).toEqual(mockUser);
    expect(actual.isAuthChecked).toEqual(true);
    expect(actual.requestStatus).toEqual(RequestStatus.Success);
  });

  it('должен корректно обрабатывать updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type };
    const actual = userReducer(initialState, action);
    expect(actual.isAuthChecked).toEqual(false);
    expect(actual.requestStatus).toEqual(RequestStatus.Failed);
  });

  it('должен корректно обрабатывать updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const actual = userReducer(initialState, action);
    expect(actual.requestStatus).toEqual(RequestStatus.Loading);
  });

  it('должен корректно обрабатывать logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const actual = userReducer(initialState, action);
    expect(actual.data).toBeNull();
    expect(actual.requestStatus).toEqual(RequestStatus.Idle);
  });
});
