import { Box, VStack, SimpleGrid, GridItem, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { PiBooks } from "react-icons/pi";

interface HistoryState {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

interface HistoryData {
  total: number;
  states: HistoryState[];
}

interface HistoricalMetricsProps {
  dagRunData: HistoryData;
  taskInstanceData: HistoryData;
}

const colorMap: Record<string, string> = {
  success: "green",
  failed: "red",
  running: "cyan",
  queued: "gray",
  upstream_failed: "orange",
};

const MetricSection = ({ title, total, states }: { title: string; total: number; states: HistoryState[] }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <HStack mb={3}>
        <Box bg="blue.100" color="blue.700" fontSize="md" fontWeight="bold" px={2} py={1} borderRadius="md">
          {total}
        </Box>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </HStack>

      <VStack gap={4} align="stretch">
        {states.map((state) => (
          <VStack key={state.id} align="stretch" gap={1}>
            <HStack justify="space-between">
              <HStack>
                <Box
                  bg={`${colorMap[state.id] || "gray"}.100`}
                  color={`${colorMap[state.id] || "gray"}.700`}
                  fontSize="sm"
                  fontWeight="bold"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {state.count}
                </Box>
                <Text fontSize="sm">{state.name}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {state.percentage.toFixed(2)}%
              </Text>
            </HStack>
            {/* Simple progress bar */}
            <Box w="100%" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
              <Box
                w={`${state.percentage}%`}
                h="100%"
                bg={`${colorMap[state.id] || "gray"}.500`}
              />
            </Box>
          </VStack>
        ))}
      </VStack>
    </Box>
  );
};

export const HistoricalMetrics = ({ dagRunData, taskInstanceData }: HistoricalMetricsProps) => {
  return (
    <Box width="100%">
      <Flex color="gray.600" my={2}>
        <PiBooks />
        <Heading ml={1} size="xs">
          History
        </Heading>
      </Flex>
      <SimpleGrid columns={{ base: 10 }} gap={2}>
        <GridItem colSpan={{ base: 7 }}>
          <VStack gap={4} align="stretch">
            <MetricSection title="Dag Runs" total={dagRunData.total} states={dagRunData.states} />
            <MetricSection
              title="Task Instances"
              total={taskInstanceData.total}
              states={taskInstanceData.states}
            />
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 3 }}>
          <Box borderWidth={1} borderRadius="lg" p={4} height="100%">
            <Heading as="h3" size="md">
              Asset Events
            </Heading>
            <Text fontSize="sm" color="gray.500" mt={2}>
              No Asset Events found.
            </Text>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
