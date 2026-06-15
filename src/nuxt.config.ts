// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/',
      appEnv: process.env.APP_ENV || 'local',
      appVersion: process.env.APP_VERSION || '1.0.0',
      sentryDsn: process.env.SENTRY_DSN || '',
      sentryEnv: process.env.SENTRY_ENV || 'local',
      sentryDisabled: process.env.SENTRY_DISABLED || '0',

      // Local API URLs (used when appEnv === 'local')
      apiSalesLocalUrl: process.env.API_SALES_LOCAL_URL || '',
      apiAiLocalUrl: process.env.API_AI_LOCAL_URL || '',
      apiPoppaLocalUrl: process.env.API_POPPA_LOCAL_URL || '',
      apiInventoryLocalUrl: process.env.API_INVENTORY_LOCAL_URL || '',
      apiArloLocalUrl: process.env.API_ARLO_LOCAL_URL || '',
      apiEmployeeLocalUrl: process.env.API_EMPLOYEE_LOCAL_URL || '',
      apiUserLocalUrl: process.env.API_USER_LOCAL_URL || '',
      apiCoreLocalUrl: process.env.API_CORE_LOCAL_URL || '',
      apiManufactureLocalUrl: process.env.API_MANUFACTURE_LOCAL_URL || '',
      apiFinanceLocalUrl: process.env.API_FINANCE_LOCAL_URL || '',
      apiWorkflowLocalUrl: process.env.API_WORKFLOW_LOCAL_URL || '',
    }
  }
})
