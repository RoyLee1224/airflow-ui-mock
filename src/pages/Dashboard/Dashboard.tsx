import { Box, Heading, VStack } from "@chakra-ui/react";
import { Stats } from "./Stats";
import { Health } from "./Health";
import { HistoricalMetrics } from "./HistoricalMetrics";
import { PoolSummary } from "./PoolSummary";
import { dashboardData } from "../../mockData";

export const Dashboard = () => {
  return (
    <Box overflow="auto" px={4} py={6}>
      <VStack alignItems="stretch" gap={6}>
        <Heading size="2xl">Welcome</Heading>

        <Box>
          <Stats
            failedDags={dashboardData.stats.failedDags}
            runningDags={dashboardData.stats.runningDags}
            activeDags={dashboardData.stats.activeDags}
          />
        </Box>

        <Box display="flex" gap={8}>
          <Health services={dashboardData.health} />
          <PoolSummary used={dashboardData.poolSlots.used} total={dashboardData.poolSlots.total} />
        </Box>

        <Box>
          <HistoricalMetrics
            dagRunData={dashboardData.dagRunHistory}
            taskInstanceData={dashboardData.taskInstanceHistory}
          />
        </Box>
      </VStack>
    </Box>
  );
};
