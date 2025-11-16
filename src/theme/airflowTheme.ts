import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

// Airflow task state colors based on the official Airflow UI
export const taskStateColors = {
  success: {
    bg: '#10b981', // green
    color: 'white',
  },
  failed: {
    bg: '#ef4444', // red
    color: 'white',
  },
  running: {
    bg: '#3b82f6', // blue
    color: 'white',
  },
  queued: {
    bg: '#64748b', // slate
    color: 'white',
  },
  scheduled: {
    bg: '#a855f7', // purple
    color: 'white',
  },
  upstream_failed: {
    bg: '#f97316', // orange
    color: 'white',
  },
  skipped: {
    bg: '#ec4899', // pink
    color: 'white',
  },
  up_for_retry: {
    bg: '#eab308', // yellow
    color: 'black',
  },
  up_for_reschedule: {
    bg: '#06b6d4', // cyan
    color: 'white',
  },
  deferred: {
    bg: '#8b5cf6', // violet
    color: 'white',
  },
  removed: {
    bg: '#71717a', // zinc
    color: 'white',
  },
  none: {
    bg: '#d1d5db', // gray
    color: 'black',
  },
}

// Airflow-inspired theme configuration
const airflowConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Primary brand colors
        brand: {
          50: { value: '#eff6ff' },
          100: { value: '#dbeafe' },
          200: { value: '#bfdbfe' },
          300: { value: '#93c5fd' },
          400: { value: '#60a5fa' },
          500: { value: '#3b82f6' }, // Main Airflow blue
          600: { value: '#2563eb' },
          700: { value: '#1d4ed8' },
          800: { value: '#1e40af' },
          900: { value: '#1e3a8a' },
        },
        // Task state colors
        taskSuccess: {
          value: '#10b981',
        },
        taskFailed: {
          value: '#ef4444',
        },
        taskRunning: {
          value: '#3b82f6',
        },
        taskQueued: {
          value: '#64748b',
        },
      },
    },
    semanticTokens: {
      colors: {
        'airflow.header.bg': {
          value: { base: '#017cee', _dark: '#1e3a8a' },
        },
        'airflow.header.text': {
          value: 'white',
        },
        'airflow.bg': {
          value: { base: '#f8fafc', _dark: '#0f172a' },
        },
        'airflow.card.bg': {
          value: { base: 'white', _dark: '#1e293b' },
        },
      },
    },
  },
})

export const airflowSystem = createSystem(defaultConfig, airflowConfig)
