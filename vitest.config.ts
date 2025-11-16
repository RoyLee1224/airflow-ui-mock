import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'chromium',
        }
      ],
      provider: playwright({
        launch: {
          timeout: 60000,
        },
      }),
      headless: true,
      screenshotFailures: false,
    },
    setupFiles: ['./src/test/setup.ts'],
    testTimeout: 30000,
  },
})
