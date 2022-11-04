/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_REGION: string
  readonly VITE_AUTH_USER_POOL_ID: string
  readonly VITE_AUTH_USER_POOL_WEB_CLIENT_ID: string
  readonly VITE_AUTH_COOKIE_STORAGE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}