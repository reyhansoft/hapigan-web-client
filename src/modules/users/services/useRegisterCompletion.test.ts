import { test } from 'vitest'
import useRegisterCompletion from './useRegisterCompletion'

vi.mock("./useUserOptions", () => {
  let _cache: any = null
  const useUserOptions = () => {
    if (!_cache) {
      _cache = {
        password: {
          requiredLength: 6,
          requiredUniqueChars: 0,
          requireNonAlphanumeric: false,
          requireLowercase: false,
          requireUppercase: false,
          requireDigit: false
        },
        user: {
          allowedUserNameCharacters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._',
          allowedUserNameCharactersMessage: 'User name is invalid, can only contain letters, digits, Underscore and Dot.',
          requireUniqueEmail: false,
          maxUsernameLength: 3,
          minUsernameLength: 32,
          maxDisplayNameLength: 32,
          usernameRequiredUniqueChars: 3
        }
      }
    }
    return _cache
  }
  return { default: useUserOptions }
})


vi.mock("@/modules/notifications/index.ts", () => {
  let _cache: any = null
  const useNotifications = () => {
    if (!_cache) {
      _cache = {
        error: vi.fn(),
        success: vi.fn()
      }
    }
    return _cache
  }
  return { useNotifications }
})

vi.mock('@/modules/i18n/index.ts', () => {
  let _cache: any = null
  if (!_cache) {
    _cache = {
      useI18n: () => ({
        t: vi.fn((msg) => msg)
      })
    }
  }
  return _cache
})

test('TODO: complete', () => {
  // arrange
  const service = useRegisterCompletion()
  // act
  // assert
})