import { get, set } from '@/services/common/cookies'
import { getLanguages, getTranslations } from '../api/i18nApi'
import useI18nStore from '../stores/useI18nStore'

const useI18nInitializer = async () => {
  try {
    let language = get('ln')
    const store = useI18nStore()

    const languages = await getLanguages()
    store.setLanguages(languages)

    if (languages.some(t => t.code !== language)) {
      language = languages.find(t => t.isDefault)?.code || null
    }
    language = language || 'en'
    set('ln', language, 365)
    const translations = await getTranslations(language)
    store.setTranslatons(translations)

    const isRtl = languages.find(t => t.code === language)?.isRtl || false
    document?.querySelector('html')?.setAttribute('dir', isRtl ? 'rtl': 'ltr')
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}

export default useI18nInitializer
