export const useAppStore = defineStore('app', {
  state: () => ({
    roles: [] as string[],
    companyID: [] as string[],
    deferredPrompt: null as any,
  }),
  actions: {
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setCompanyID(ids: string[]) {
      this.companyID = ids
    },
    setDeferredPrompt(prompt: any) {
      this.deferredPrompt = prompt
    },
  },
})
