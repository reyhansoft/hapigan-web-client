import { Store } from "pinia"
import { getOptions } from "../api/optionsApi"
import { useOptionsStore } from "../stores/optionsStore"

const initializeOptions = async () => {
  const store = useOptionsStore()
  try {
    store.setOptions(await getOptions())
    return true
  } catch (e) {
    console.log(`failed to initialize options ${e}`)
    return false
  }
}

export default initializeOptions