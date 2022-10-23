import { test, expect, beforeAll, vi } from 'vitest'
import { Notification } from './types'

test('notification id should set', () => {
  // arrange
  const notification = Notification.Error("MESSAGE", 5)

  // assert
  expect(notification.id).not.toBe('')
})

test('should generate different ids', () => {
  // arrange
  const notification1 = Notification.Error("MESSAGE", 5)
  const notification2 = Notification.Error("MESSAGE", 5)

  // assert
  expect(notification1.id).not.toBe(notification2)
})

test('should use default close after', () => {
  // arrange
  const expectedDefaultClsoeAfter = 5
  const notification = Notification.Error("MESSAGE")

  // assert
  expect(notification.closeAfter).toBe(expectedDefaultClsoeAfter)
})