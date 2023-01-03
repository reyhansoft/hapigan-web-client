import useApiErrorHandlingBlock from "@/modules/errors/useApiErrorHandlingBlock"
import useUser from "@/modules/users/services/useUser"
import { computed, Ref, ref, watch } from "vue"
import { searchRepositories } from "../api/repositoriesApi"
import { Repository } from "../types"

const useSearchRepositories = (options: {
  onlyMyRepositories: boolean,
  allowedActions: Array<number>
} = {
  onlyMyRepositories: true,
  allowedActions: []
}) => {
  const isProcessing = ref(false)
  const start = ref(0)
  const query = ref('')
  const searchTimerFalg = ref(-1)
  const hasMore = ref(false)
  const items = ref<Array<Repository>>([])
  const lastQuery = ref('')
  const onlyMyRepositories = ref(options.onlyMyRepositories)
  const user = useUser()
  const memberId = computed(() => onlyMyRepositories.value ? user.id: null)

  const search = async () => {
    isProcessing.value = true
    await useApiErrorHandlingBlock(async () => {
      lastQuery.value = query.value
      const result = await searchRepositories({
        start: start.value,
        memberId: memberId.value,
        query: query.value,
        allowedActions: options.allowedActions
      })
      items.value = result.repositories
      hasMore.value = result.hasMore
      return { success: true }
    })
    isProcessing.value = false
  }

  watch(start, () => {
    if (start.value == 0) {
      items.value = []
    }
  })

  watch(query, () => {
    clearTimeout(searchTimerFalg.value)
    if (query.value.trim().length >= 3 || query.value.trim().length === 0) {
      searchTimerFalg.value = setTimeout(async () => {
        await search()
      }, 500) as unknown as number;
    }
  })

  return {
    lastQuery,
    query,
    start,
    hasMore,
    items,
    search,
    isProcessing
  }
}

export default useSearchRepositories
