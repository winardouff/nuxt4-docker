import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => [
        'ion-tabs',
        'ion-tab-bar',
        'ion-tab-button',
      ].includes(tag),
    },
  },

  css: [
    resolve(__dirname, 'app/assets/css/layout.css'),
    resolve(__dirname, 'app/assets/scss/style.scss'),
    resolve(__dirname, 'app/assets/css/variables.css'),
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/ionic',
    ['@nuxtjs/i18n', {
      locales: [
        { code: 'en', file: 'en-US.ts' },
        { code: 'id', file: 'id-ID.ts' },
        { code: 'vi', file: 'vi-VN.ts' },
      ],
      defaultLocale: 'en',
      lazy: true,
      langDir: 'lang/',
      strategy: 'no_prefix',
    }],
  ],

  ionic: {
    integrations: {
      router: false,
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/',
      appEnv: process.env.APP_ENV || 'local',
      appVersion: process.env.APP_VERSION || 'v1.0.0',
      appHeaderTitle: process.env.APP_HEADER_TITLE || 'UNIFAM',
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
      couchDBUrl: process.env.COUCHDB_URL || '',

      // Keycloak
      keycloakUrl: process.env.KEYCLOAK_URL || '',
      keycloakRealm: process.env.KEYCLOAK_REALM || '',
      keycloakClientId: process.env.KEYCLOAK_CLIENT_ID || '',
      keycloakRedirectUri: process.env.KEYCLOAK_REDIRECT_URI || 'http://localhost:3000/callback',
      cookieExpiredInMinutes: process.env.COOKIE_EXPIRED_IN_MINUTES || '60',
    }
  }
})
