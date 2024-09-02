import { feedReducer, getFeeds, IFeedState } from '../services/slices/feed';
import { RequestStatus } from '../utils/types';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const initialState: IFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle // начальное состояние
  };

  it('should handle pending state correctly', () => {
    // Подготовка данных
    const actualState = feedReducer(
      {
        ...initialState,
        status: RequestStatus.Failed // Предположим, что перед этим запрос завершился ошибкой
      },
      getFeeds.pending('')
    );

    // Проверка результата
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading
    });
  });

  it('should handle fulfilled state correctly', () => {
    // Создаем корректные мокаемые данные, соответствующие типу TOrder
    const mockOrders: TOrder[] = [
      {
        _id: '123',
        status: 'done',
        createdAt: '2024-09-02T00:00:00.000Z',
        updatedAt: '2024-09-02T00:00:00.000Z',
        ingredients: ['ingredient1', 'ingredient2'],
        name: 'Order 1',
        number: 1
      }
    ];
    const mockTotal = 100;
    const mockTotalToday = 10;

    // Подготовка данных
    const actualState = feedReducer(
      initialState,
      getFeeds.fulfilled(
        {
          success: true,
          orders: mockOrders,
          total: mockTotal,
          totalToday: mockTotalToday
        },
        ''
      )
    );

    // Проверка результата
    expect(actualState).toEqual({
      orders: mockOrders,
      total: mockTotal,
      totalToday: mockTotalToday,
      status: RequestStatus.Success
    });
  });

  it('should handle rejected state correctly', () => {
    // Подготовка данных
    const actualState = feedReducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      getFeeds.rejected(null, '')
    );

    // Проверка результата
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Failed
    });
  });
});
