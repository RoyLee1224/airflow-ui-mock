// src/mockData.ts
import type { DashboardData } from './types';

export const dashboardData: DashboardData = {
  stats: {
    failedDags: 1,
    runningDags: 0,
    activeDags: 4,
  },
  health: [
    { id: 'meta', name: 'MetaDatabase', status: 'healthy' },
    { id: 'scheduler', name: 'Scheduler', status: 'healthy' },
    { id: 'triggerer', name: 'Triggerer', status: 'healthy' },
    { id: 'processor', name: 'Dag Processor', status: 'healthy' },
  ],
  poolSlots: {
    used: 0,
    total: 128,
  },
  dagRunHistory: {
    total: 38,
    states: [
      { id: 'queued', name: 'Queued', count: 0, percentage: 0.0 },
      { id: 'running', name: 'Running', count: 0, percentage: 0.0 },
      { id: 'success', name: 'Success', count: 31, percentage: 81.58 },
      { id: 'failed', name: 'Failed', count: 7, percentage: 18.42 },
    ],
  },
  taskInstanceHistory: {
    total: 1730,
    states: [
      { id: 'success', name: 'Success', count: 1699, percentage: 98.21 },
      { id: 'failed', name: 'Failed', count: 16, percentage: 0.92 },
      { id: 'upstream_failed', name: 'Upstream Failed', count: 15, percentage: 0.87 },
    ],
  },
};