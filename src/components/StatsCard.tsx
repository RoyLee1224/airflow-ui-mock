import { Box, HStack, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

interface StatsCardProps {
  colorScheme: string;
  count: number;
  icon?: React.ReactNode;
  label: string;
  state?: string;
}

const colorMap: Record<string, { bg: string; color: string }> = {
  failed: { bg: "#FED7D7", color: "#C53030" },
  running: { bg: "#B2F5EA", color: "#047857" },
  queued: { bg: "#E2E8F0", color: "#4A5568" },
  active: { bg: "#BEE3F8", color: "#2563EB" },
  success: { bg: "#C6F6D5", color: "#22543D" },
};

export const StatsCard = ({ colorScheme, count, icon, label }: StatsCardProps) => {
  const colors = colorMap[colorScheme] || colorMap.active;

  return (
    <HStack
      alignItems="center"
      borderRadius="lg"
      borderWidth={1}
      color="fg.emphasized"
      cursor="pointer"
      p={2}
      _hover={{ bg: "gray.50" }}
    >
      <Box
        borderRadius="full"
        bg={colors.bg}
        color={colors.color}
        fontSize="sm"
        px={3}
        py={1}
        fontWeight="bold"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {icon}
        {count}
      </Box>

      <Text color="fg" fontSize="sm" fontWeight="bold">
        {label}
      </Text>
      <FiChevronRight size={16} />
    </HStack>
  );
};
