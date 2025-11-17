import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { MdOutlineHealthAndSafety } from "react-icons/md";

interface HealthStatus {
  id: string;
  name: string;
  status: "healthy" | "unhealthy";
}

interface HealthProps {
  services: HealthStatus[];
}

const HealthBadge = ({ name, status }: { name: string; status: "healthy" | "unhealthy" }) => {
  const isHealthy = status === "healthy";

  return (
    <Box
      borderRadius="md"
      borderWidth={1}
      p={2}
      bg={isHealthy ? "green.50" : "red.50"}
      borderColor={isHealthy ? "green.200" : "red.200"}
    >
      <Text fontSize="xs" fontWeight="bold" color={isHealthy ? "green.700" : "red.700"}>
        {isHealthy ? "✓ " : "✗ "}{name}
      </Text>
    </Box>
  );
};

export const Health = ({ services }: HealthProps) => {
  return (
    <Box>
      <Flex color="gray.600" mb={2}>
        <MdOutlineHealthAndSafety />
        <Heading ml={1} size="xs">
          Health
        </Heading>
      </Flex>
      <HStack alignItems="center" gap={2}>
        {services.map((service) => (
          <HealthBadge key={service.id} name={service.name} status={service.status} />
        ))}
      </HStack>
    </Box>
  );
};
