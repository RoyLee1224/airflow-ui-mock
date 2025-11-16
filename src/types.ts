// src/types.ts

/** 統計卡片 (Failed, Running, Active) */
export interface StatData {
  failedDags: number;
  runningDags: number;
  activeDags: number;
}

/** 服務健康狀態 */
export interface HealthItem {
  id: string;
  name: string;
  status: 'healthy' | 'unhealthy';
}

/** 資源池 */
export interface PoolSlotData {
  used: number;
  total: number;
}

/** 單位歷史狀態 (例如 'success', 'failed') */
export interface HistoryState {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

/** 歷史紀錄總覽 (用於 Dag Runs 和 Task Instances) */
export interface HistoryData {
  total: number;
  states: HistoryState[];
}

/** 儀表板所有資料的完整型別 */
export interface DashboardData {
  stats: StatData;
  health: HealthItem[];
  poolSlots: PoolSlotData;
  dagRunHistory: HistoryData;
  taskInstanceHistory: HistoryData;
}