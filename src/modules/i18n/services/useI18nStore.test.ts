import { setActivePinia, createPinia } from 'pinia'
import { test, expect, beforeEach } from 'vitest'
import useI18nStore from './useI18nStore'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('should return message itself when no messages available', () => {
  // arrange
  const { translate } = useI18nStore()
  const message = "TEST MESSAGE"
  
  // act
  const translatedMessage = translate(message)

  // assert
  expect(translatedMessage).toBe(message)
})

test('should return message translation', () => {
  // arrange
  const { translate, messages } = useI18nStore()
  const origMessage = "Test message"
  const transMessage = "Translated test message"
  messages[origMessage] = transMessage

  // act
  const translatedMessage = translate(origMessage)

  // assert
  expect(translatedMessage).toBe(transMessage)
})

test('should return message translation', () => {
  // arrange
  const { translate, messages } = useI18nStore()
  const origMessage = "Test message"
  const transMessage = "Translated test message"

  // act
  const translatedMessageBeforeChange = translate(origMessage)
  messages[origMessage] = transMessage
  const translatedMessageAfterChange = translate(origMessage)

  // assert
  expect(translatedMessageBeforeChange).toBe(origMessage)
  expect(translatedMessageAfterChange).toBe(transMessage)

})