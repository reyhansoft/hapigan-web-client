import { setActivePinia, createPinia } from 'pinia'
import useNotificationStore from './store'
import { test, expect, beforeEach } from 'vitest'
import { Notification } from './types'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('should add notification to list', () => {
  // arrange
  const { add, list } = useNotificationStore()
  const notification = Notification.Error("TEST_MESSAGE", 5)

  // act
  add(notification)

  // assert
  expect(list.length).toBe(1)
  expect(list[0].message).toBe(notification.message)
})

test('should remove notification from list', () => {
  // arrange
  const { add, list, remove } = useNotificationStore()
  const notification = Notification.Error("TEST_MESSAGE", 5)
  add(notification)

  // act
  remove(notification.id)

  // assert
  expect(list.length).toBe(0)
})
