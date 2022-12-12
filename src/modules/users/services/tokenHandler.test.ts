import { ApiError } from '@/modules/apiClient/types'
import wait from '@/services/common/wait'
import { vi, test, Mock } from 'vitest'
import { getMe } from "../api/userApi"
import { secureRequestHandler, setToken } from './tokenHandler'

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock("../api/userApi", () => {
  return { getMe:  vi.fn() }
})

test('should add auth header when token is set and valid', async () => {
  // arrange
  const expirationDateTime = new Date()
  expirationDateTime.setDate(new Date().getDate() + 1)
  const token = {
    token: 'test',
    expirationDateTime
  }
  setToken(token)
  const config = { method: 'POST', url: 'Test'}

  // act
  const result = await secureRequestHandler(config)

  // assert
  expect(result.headers!['Authorization']).toBe(`bearer ${token.token}`)
})

test('should try to renew token when token is expired', async () => {
  // arrange
  const expirationDateTime = new Date()
  expirationDateTime.setDate(new Date().getDate() - 1)
  const token = {
    token: 'test',
    expirationDateTime
  }
  const expectedToken = 'test-2'
  setToken(token)
  const config = { method: 'POST', url: 'Test'}

  ;(getMe as Mock).mockImplementation(() => {
    const newExpirationDateTime = new Date()
    newExpirationDateTime.setDate(new Date().getDate() + 1)
    return {
      isAuthenticated: true,
      token: expectedToken,
      expirationDateTime: newExpirationDateTime
    }
  })

  // act
  const result = await secureRequestHandler(config)

  // assert
  expect(result.headers!['Authorization']).toBe(`bearer ${expectedToken}`)
})

test('concurrent requests, only one request should be sent to getMe', async () => {
  // arrange
  const expirationDateTime = new Date()
  expirationDateTime.setDate(new Date().getDate() - 1)
  const token = {
    token: 'test',
    expirationDateTime
  }
  const expectedToken = 'test-2'
  setToken(token)
  const config = { method: 'POST', url: 'Test'}

  ;(getMe as Mock).mockImplementation(async () => {
    await wait(100)
    const newExpirationDateTime = new Date()
    newExpirationDateTime.setDate(new Date().getDate() + 1)
    return {
      isAuthenticated: true,
      token: expectedToken,
      expirationDateTime: newExpirationDateTime
    }
  })

  // act
  const firstRequest = secureRequestHandler(config)
  const nextRequest = secureRequestHandler(config)

  const firstResult = await firstRequest
  const nextResult = await nextRequest

  // assert
  expect(firstResult.headers!['Authorization']).toBe(`bearer ${expectedToken}`)
  expect(nextResult.headers!['Authorization']).toBe(`bearer ${expectedToken}`)
  expect(getMe).toBeCalledTimes(1)
})

test('throws ApiError if token is not set', async () => {
  // arrange
  let exceptionThrew = false

  // act
  setToken(null)
  try {
    await secureRequestHandler({})
  } catch (e) {
    exceptionThrew = e instanceof ApiError
  }

  // assert
  expect(exceptionThrew).toBeTruthy()
})