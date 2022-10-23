import { render, fireEvent } from '@testing-library/vue'
import NotificationContainer from './NotificationsContainer.vue'
import { expect, test, vi, afterEach } from 'vitest'
import { Notification } from '../services/types'
import useNotifications from '../services/useNotifications'

vi.mock('../services/useNotifications', () => {
  let _cache: any = null

  const obj = () => {
    if (!_cache) {
      _cache = {
        notifications: [
          Notification.Success('SUCCESS', 0),
          Notification.Error('ERROR', 0)
        ]
      }
    }
    return _cache
  }
  return { default: obj }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('should show notifications', () => {
  // arrange
  const { notifications } = useNotifications()

  // act
  const { container } = render(NotificationContainer, {
    props: { }
  })

  // assert
  expect(container.firstElementChild?.childElementCount).toBe(2)
})