import { useOptionsStore } from "@/modules/options/stores/optionsStore"

const useUserOptions = () => {
  const optionsStore = useOptionsStore()

  return {
    password: {
      get requiredLength () {
        return optionsStore.getOption<number>('Identity:Password:RequiredLength', 6)
      },
      get requiredUniqueChars() {
        return optionsStore.getOption<number>('Identity:Password:RequiredUniqueChars', 0)
      },
      get requireNonAlphanumeric() {
        return optionsStore.getOption<boolean>('Identity:Password:RequireNonAlphanumeric', false)
      },
      get requireLowercase() {
        return optionsStore.getOption<boolean>('Identity:Password:RequireLowercase', false)
      },
      get requireUppercase() {
        return optionsStore.getOption<boolean>('Identity:Password:RequireUppercase', false)
      },
      get requireDigit() {
        return optionsStore.getOption<boolean>('Identity:Password:RequireDigit', false)
      }
    },
    user: {
      get allowedUserNameCharacters() {
        return optionsStore.getOption<string>('Identity:User:AllowedUserNameCharacters', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._')
      },
      get allowedUserNameCharactersMessage() {
        return optionsStore.getOption<string>('Identity:User:AllowedUserNameCharactersMessage', 'User name is invalid, can only contain letters, digits, Underscore and Dot.')
      },
      get requireUniqueEmail() {
        return optionsStore.getOption<boolean>('Identity:User:RequireUniqueEmail', false)
      },
    }
  }
}

export default useUserOptions