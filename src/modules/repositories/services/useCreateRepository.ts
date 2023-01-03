import useApiErrorHandlingBlock from "@/modules/errors/useApiErrorHandlingBlock"
import { useI18n } from "@/modules/i18n"
import { useCompoundValidator, useRegexValidator, useRequired, useValidation } from "@/modules/validations"
import useLengthValidator from "@/modules/validations/validators/useLengthValidator"
import { Ref, ref } from "vue"
import { createRepository } from "../api/repositoriesApi"
import { Repository } from "../types"
import useRepositoryOptions from "./useRepositoryOptions"

const useCreateRepository = () => {
  const options = useRepositoryOptions()

  const name = ref('')
  const parent: Ref<Repository | null> = ref(null)
  const description = ref('')
  const title = ref('')
  const rules = ref('')
  const visibility = ref(options.defaultRepositoryVisibility) // TODO: default
  const isProcessing = ref(false)
  const { t } = useI18n()


  const nameValidator = useCompoundValidator([
    useRequired(name, t('Repository name')),
    useLengthValidator(name, options.minNameLength, options.maxNameLength, t('Repository name')), // TODO: Max and min length of repository name
    useRegexValidator(name, /^[a-zA-Z0-9]*$/, t('Repository name'), t('Repository name should only contain alphabet and numbers'))
  ])

  const titleValidator =  useCompoundValidator([
    useRequired(title, t('Title')),
    useLengthValidator(title, 0, options.maxTitleLength, t('Title'))
  ])
  const descriptionValidator = useCompoundValidator([
    useRequired(description, t('Description')),
    useLengthValidator(description, 0, options.maxDescriptionLength, t('Description'))
  ])

  const rulesValidator = useLengthValidator(rules, 0, options.maxRulesLength, t('Rules'))

  const validator = useValidation([
    nameValidator,
    titleValidator,
    descriptionValidator,
    rulesValidator
  ])

  return {
    name,
    nameValidator,
    parent,
    description,
    descriptionValidator,
    title,
    titleValidator,
    visibility,
    isProcessing,
    rules,
    rulesValidator,
    changeVisibility: (value: number) => {
      visibility.value = value
    },
    create: async () => {
      if (!validator.validate()) {
        return
      }
      const result = await useApiErrorHandlingBlock(async () => {
        const result = await createRepository({
          name: name.value,
          title: title.value,
          description: description.value,
          visibility: visibility.value,
          parentId: parent?.value?.id?.toString() || null
        })
        return result
      })
      return result
    }
  }
}

export default useCreateRepository
