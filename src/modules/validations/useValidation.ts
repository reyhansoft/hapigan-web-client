import { Validation, Validator } from "./types"

const useValidation = (validators: Array<Validator>) : Validation => {
  return {
    validate: () => {
      let result = true
      for(const validator of validators) {
        result = validator.validate() && result
      }
      return result
    }
  }
}

export default useValidation
