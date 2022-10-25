import Vue, { ComponentCustomOptions } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $t: (msg: string, ...args: Array<string>) => string
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (msg: string, ...args: Array<string>) => string
  }
}
