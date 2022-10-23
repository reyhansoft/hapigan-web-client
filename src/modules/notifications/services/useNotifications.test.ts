import { test, expect, afterEach, vi, vitest } from 'vitest'
import useNotifications from './useNotifications'
import useStore from './store'
import { NotificationType } from './types'

vi.mock('./store', () => {
  let _cache : any = null

  const useStore = () => {
    if (!_cache) {
      _cache = {
        add: vi.fn(),
        remove: vi.fn(),
        list: [1, 2]
      }
    }
    return _cache
  }
  return { default: useStore }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('add success should call store add', () => {
  // arrange
  const store = useStore()
  const { success } = useNotifications()
  const SUCCESS_MESSAGE = 'MESSAGE'
  const CLOSE_AFTER = 5

  // act
  success(SUCCESS_MESSAGE)

  // assert
  expect(store.add)
    .toBeCalledWith(
      expect.objectContaining({ 
        type: NotificationType.Success,
        message: SUCCESS_MESSAGE,
        closeAfter: CLOSE_AFTER
      })
    )
})

test('add error should call store add', () => {
  // arrange
  const store = useStore()
  const { error } = useNotifications()
  const ERROR_MESSAGE = 'MESSAGE'
  const CLOSE_AFTER = 5

  // act
  error(ERROR_MESSAGE)

  // assert
  expect(store.add)
    .toBeCalledWith(
      expect.objectContaining({ 
        type: NotificationType.Error,
        message: ERROR_MESSAGE,
        closeAfter: CLOSE_AFTER
      })
    )
})

test('should call store remove', () => {
  // arrange
  const store = useStore()
  const { remove } = useNotifications()
  const NOTIFICATION_ID = 'TEST_ID'

  // act
  remove(NOTIFICATION_ID)

  // assert
  expect(store.remove).toBeCalledWith(NOTIFICATION_ID)
})

test('notifications should return store.list', () => {
  // arrange
  const store = useStore()
  const { notifications } = useNotifications()

  // act
  const count = notifications.value.length

  // assert
  expect(count).toBe(2)
})
