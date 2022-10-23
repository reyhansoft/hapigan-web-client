import { render, fireEvent } from '@testing-library/vue'
import NotificationItem from './NotificationItem.vue'
import { expect, test, vi, afterEach } from 'vitest'
import { Notification } from '../services/types'
import UseNotifications from '../services/useNotifications'
import wait from '../../../services/common/wait'

vi.mock('../services/useNotifications', () => {
  let _cache: any = null

  const obj = () => {
    if (!_cache) {
      _cache = {
        remove: vi.fn()
      }
    }
    return _cache
  }
  return { default: obj }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('should call remove for auto close', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Error('MESSAGE', 0.01)
  // act
  render(NotificationItem, {
    props: {
      notification
    }
  })
  await wait(100)

  // assert
  expect(remove).toBeCalledWith(notification.id)
})

test('should not call remove for auto close', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Error('MESSAGE', 0)
  // act
  render(NotificationItem, {
    props: {
      notification
    }
  })
  await wait(100)
  
  // assert
  expect(remove).not.toBeCalledWith(notification.id)
})

test('should call remove on button click', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Error('MESSAGE', 0)
  // act
  const { getByRole } = render(NotificationItem, {
    props: {
      notification
    }
  })

  const button = getByRole('button')
  fireEvent.click(button)

  // assert
  expect(remove).toBeCalledWith(notification.id)
})

test('should apply error classes', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Error('MESSAGE', 0)
  // act
  const { container } = render(NotificationItem, {
    props: {
      notification
    }
  })

  // assert
  expect(container.firstElementChild?.classList.contains('bg-red-100')).toBeTruthy()
  expect(container.firstElementChild?.classList.contains('text-red-700')).toBeTruthy()
})

test('should apply success classes', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Success('MESSAGE', 0)
  // act
  const { container } = render(NotificationItem, {
    props: {
      notification
    }
  })

  // assert
  expect(container.firstElementChild?.classList.contains('bg-green-100')).toBeTruthy()
  expect(container.firstElementChild?.classList.contains('text-green-700')).toBeTruthy()
})

test('should show message', async () => {
  // arrange
  const { remove } = UseNotifications()
  const notification = Notification.Success('MESSAGE', 0)

  // act
  const { container } = render(NotificationItem, {
    props: {
      notification
    }
  })
  const span = container.querySelector('span')
  // assert
  expect(span?.innerText).toBe(notification.message)
})

