import { useOptionsStore } from "@/modules/options/stores/optionsStore"

const useRepositoryOptions = () => {
  const optionsStore = useOptionsStore()

  return {
    get maxDescriptionLength () {
      return optionsStore.getOption<number>('Repository:MaxDescriptionLength', 128)
    },
    get maxNameLength() {
      return optionsStore.getOption<number>('Repository:MaxNameLength', 32)
    },
    get maxTitleLength() {
      return optionsStore.getOption<number>('Repository:MaxTitleLength', 32)
    },
    get minNameLength() {
      return optionsStore.getOption<number>('Repository:MinNameLength', 3)
    },
    get namePattern () {
      return optionsStore.getOption<string>('Repository:NamePattern', '^[a-zA-Z0-9]+$')
    },
    get namePatternMessage () {
      return optionsStore.getOption<string>('Repository:NamePatternMessage', 'Repository name should only contain alphabets and numbers')
    },
    get maxRulesLength () {
      return optionsStore.getOption<number>('Repository:MaxRulesLength', 512)
    },
    get defaultRepositoryVisibility () {
      return optionsStore.getOption<number>('Repository:DefaultRepositoryVisibility', 1)
    }
  }
}

export default useRepositoryOptions