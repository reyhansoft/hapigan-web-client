import { Ref } from "vue";

export interface Validator {
  validate: () => boolean,
  isValid: Ref<boolean | null>,
  message: Ref<Array<string>>,
  isTouched: Ref<boolean>,
  touched: () => void
}

export interface Validation {
  validate: () => boolean
}
