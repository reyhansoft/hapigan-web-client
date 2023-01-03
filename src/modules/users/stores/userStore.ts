import { defineStore } from 'pinia'
import { SetAuthenticatedUserModel, UserState } from '../types'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    isInited: false,
    isAuthenticated: false,
    name: '',
    isCompleted: false,
    username: ''
  }) as UserState,
  actions: {
    setAuthenticatedUser(state: SetAuthenticatedUserModel) {
      this.isInited = true
      this.isAuthenticated = true
      this.name = state.name
      this.isCompleted = state.isCompleted
      this.username = state.username
      this.id = state.id
    },
    setGuestUser() {
      this.id = ''
      this.isInited = true
      this.isAuthenticated = false
      this.name = ''
      this.isCompleted = false
      this.username = ''
    },
    setRegistrationCompleted () {
      this.isCompleted = true
    }
  }
})
