import { defineStore } from 'pinia'
import { IOptionsState } from '../types'

export const useOptionsStore = defineStore('options', {
	state: () => ({
		options: []
	}) as IOptionsState,
	getters: {
		getOption: (state) => function<T>(name: string, defaultValue: T) {
			return state.options[name] as T || defaultValue
		}
	},
	actions: {
		setOptions (options: { [key: string]: any }) {
			this.options = options
		}
	}
})
