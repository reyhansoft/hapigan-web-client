import { computed } from "vue";
import { Validator } from "../types";

const useCompoundValidator = (validators: Array<Validator>) : Validator => {

  return {
    validate: () => {
      let result = true
      validators.forEach(validator => {
        result = validator.validate() && result
      })
      return result
    },
    touched: () => {
      validators.forEach(validator => {
        validator.touched()
      });
    },
    isTouched: computed(() => validators.some(t => t.isTouched.value)),
    isValid: computed(() => 
      validators.every(t => t.isValid.value === null)
        ? null
        : validators.filter(t => t.isValid.value !== null).every(t => t.isValid.value)
    ),
    message: computed(() => validators.filter(t => !t.isValid.value).flatMap(t => t.message.value))
  }
}

export default useCompoundValidator
