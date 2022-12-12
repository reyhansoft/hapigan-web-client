import { defineStore } from 'pinia'
import { SetAuthenticatedUserModel, UserState } from '../types'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    name: '',
    isCompleted: false
  }) as UserState,
  actions: {
    setAuthenticatedUser(state: SetAuthenticatedUserModel) {
      this.isAuthenticated = true
      this.name = state.name
      this.isCompleted = state.isCompleted
    },
    setGuestUser() {
      this.isAuthenticated = false
      this.name = ''
      this.isCompleted = false
    }
  }
})
