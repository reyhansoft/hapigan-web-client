import { test, expect, afterEach } from 'vitest'
import useI18nStore from './useI18nStore'
import useI18n from './useI18n'

vi.mock('./useI18nStore', () => {
  let _cache : any = null

  const useStore = () => {
    if (!_cache) {
      _cache = {
        translate: vi.fn((msg) => msg)
      }
    }
    return _cache
  }
  return { default: useStore }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('should call store translate', () => {
  // arrange
  const { translate } = useI18nStore()
  const { t } = useI18n()
  const message = 'test message'

  // act
  const translatedMessage = t(message)

  // assert
  expect(translate).toBeCalledWith(message)
  expect(translatedMessage).toBe(message)
})

test('should format message', () => {
  // arrange
  const { t } = useI18n()
  const message = 'test {0} message {1}'
  const expectedMessage = 'test hello message world'
  const params = ['hello', 'world']

  // act
  const translatedMessage = t(message, ...params)

  // assert
  expect(translatedMessage).toBe(expectedMessage)
})

test('should format message with duplicate placeholder', () => {
  // arrange
  const { t } = useI18n()
  const message = 'test {0} message {0}'
  const expectedMessage = 'test hello message hello'
  const params = ['hello']

  // act
  const translatedMessage = t(message, ...params)

  // assert
  expect(translatedMessage).toBe(expectedMessage)
})
