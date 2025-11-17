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
      viewport: {
        width: 1920,
        height: 1080,
      },
    },
    setupFiles: ['./src/test/setup.ts'],
    testTimeout: 30000,
    resolveSnapshotPath: (testPath, snapExtension) => {
      // Custom screenshot path resolver
      // This ensures screenshots are saved to project root/screenshots
      const fileName = testPath.split('/').pop()?.replace('.test.tsx', '') || 'test';
      return `${process.cwd()}/screenshots/${fileName}${snapExtension}`;
    },
  },
})
