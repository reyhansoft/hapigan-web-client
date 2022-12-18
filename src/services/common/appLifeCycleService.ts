export type Hook = () => Promise<boolean>

const onMountHooks: Array<Hook> = []

export type AppLifeCycleService = {
	onMount: (fn: Hook) => void,
	getOnMountHooks: Array<Hook>
}

export default {
  onMount: (fn: Hook) => {
	onMountHooks.push(fn)
  },
	getOnMountHooks: () => [...onMountHooks]
}
