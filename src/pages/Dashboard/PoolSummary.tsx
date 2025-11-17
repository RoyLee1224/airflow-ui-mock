import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FiLayers } from "react-icons/fi";

interface PoolSummaryProps {
  used: number;
  total: number;
}

export const PoolSummary = ({ used, total }: PoolSummaryProps) => {
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <Box>
      <Flex color="gray.600" mb={2}>
        <FiLayers />
        <Heading ml={1} size="xs">
          Pool Slots
        </Heading>
      </Flex>
      <Box borderWidth={1} borderRadius="md" p={4} minW="200px">
        <Text fontSize="sm" mb={2}>
          {used} / {total} slots used
        </Text>
        {/* Simple progress bar */}
        <Box w="100%" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
          <Box w={`${percentage}%`} h="100%" bg="blue.500" />
        </Box>
        <Text fontSize="xs" color="gray.500" mt={1}>
          {/* {percentage.toFixed(1)}% utilized */}
        </Text>
      </Box>
    </Box>
  );
};
