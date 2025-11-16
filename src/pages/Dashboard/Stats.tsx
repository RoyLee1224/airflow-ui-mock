import { Box, Flex, Heading } from "@chakra-ui/react";
import { FiClipboard, FiZap } from "react-icons/fi";
import { StatsCard } from "../../components/StatsCard";

interface StatsProps {
  failedDags: number;
  runningDags: number;
  queuedDags?: number;
  activeDags: number;
}

export const Stats = ({ failedDags, runningDags, queuedDags, activeDags }: StatsProps) => {
  return (
    <Box>
      <Flex alignItems="center" color="gray.600" my={2}>
        <FiClipboard />
        <Heading ml={1} size="xs">
          Stats
        </Heading>
      </Flex>

      <Flex flexWrap="wrap" gap={4}>
        <StatsCard
          colorScheme="failed"
          count={failedDags}
          label="Failed Dags"
          state="failed"
        />

        {queuedDags !== undefined && queuedDags > 0 && (
          <StatsCard
            colorScheme="queued"
            count={queuedDags}
            label="Queued Dags"
            state="queued"
          />
        )}

        <StatsCard
          colorScheme="running"
          count={runningDags}
          label="Running Dags"
          state="running"
        />

        <StatsCard
          colorScheme="active"
          count={activeDags}
          icon={<FiZap />}
          label="Active Dags"
        />
      </Flex>
    </Box>
  );
};
