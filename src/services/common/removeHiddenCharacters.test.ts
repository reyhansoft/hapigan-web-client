import { test } from 'vitest'
import removeHiddenCharacters from './removeHiddenCharacters'

test('should return other characters', () => {
  // arrange
  const text = "With out any hidden characters"
  const expectedResult = "Withoutanyhiddencharacters"
  // act
  const result = removeHiddenCharacters(text)

  // assert
  expect(result).toBe(expectedResult)
})