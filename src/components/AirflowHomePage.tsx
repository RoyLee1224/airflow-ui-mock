import { Box, Container, Flex, Heading, Text, Badge, Table, IconButton, HStack, VStack } from '@chakra-ui/react';
import { FaPlay, FaPause, FaSync } from 'react-icons/fa';

interface DAG {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed' | 'paused';
  lastRun: string;
  nextRun: string;
}

const mockDAGs: DAG[] = [
  { id: '1', name: 'example_dag_1', status: 'success', lastRun: '2025-11-16 10:30', nextRun: '2025-11-16 11:30' },
  { id: '2', name: 'data_pipeline', status: 'running', lastRun: '2025-11-16 10:00', nextRun: '2025-11-16 12:00' },
  { id: '3', name: 'ml_training', status: 'failed', lastRun: '2025-11-16 09:45', nextRun: '2025-11-16 13:00' },
  { id: '4', name: 'etl_process', status: 'paused', lastRun: '2025-11-15 23:00', nextRun: '-' },
];

const statusColors = {
  success: 'green',
  running: 'blue',
  failed: 'red',
  paused: 'gray',
};

export const AirflowHomePage = () => {
  return (
    <Box minH="100vh" bg="gray.50" data-testid="airflow-home-page">
      {/* Header */}
      <Box bg="blue.600" color="white" py={4} shadow="md">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading size="lg">Apache Airflow</Heading>
            <HStack gap={4}>
              <Text fontSize="sm">v2.8.0</Text>
              <Badge colorScheme="green">Production</Badge>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="container.xl" mt={6}>
        <Flex gap={4} mb={6}>
          <StatCard label="Total DAGs" value="24" color="blue" />
          <StatCard label="Running" value="3" color="blue" />
          <StatCard label="Success" value="18" color="green" />
          <StatCard label="Failed" value="2" color="red" />
          <StatCard label="Paused" value="1" color="gray" />
        </Flex>

        {/* DAGs Table */}
        <Box bg="white" borderRadius="lg" shadow="md" p={6}>
          <Heading size="md" mb={4}>DAGs</Heading>
          <Table.Root size="sm" variant="line">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>DAG Name</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Last Run</Table.ColumnHeader>
                <Table.ColumnHeader>Next Run</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mockDAGs.map((dag) => (
                <Table.Row key={dag.id} data-testid={`dag-row-${dag.id}`}>
                  <Table.Cell>
                    <Text fontWeight="medium">{dag.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorScheme={statusColors[dag.status]}>
                      {dag.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">{dag.lastRun}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.600">{dag.nextRun}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={2}>
                      <IconButton
                        aria-label="Trigger DAG"
                        size="sm"
                        variant="ghost"
                        colorScheme="green"
                      >
                        <FaPlay />
                      </IconButton>
                      <IconButton
                        aria-label="Pause DAG"
                        size="sm"
                        variant="ghost"
                        colorScheme="orange"
                      >
                        <FaPause />
                      </IconButton>
                      <IconButton
                        aria-label="Refresh DAG"
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                      >
                        <FaSync />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Container>
    </Box>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

const StatCard = ({ label, value, color }: StatCardProps) => (
  <Box
    flex="1"
    bg="white"
    p={4}
    borderRadius="lg"
    shadow="md"
    data-testid={`stat-card-${label.toLowerCase().replace(' ', '-')}`}
  >
    <VStack align="flex-start" gap={1}>
      <Text fontSize="sm" color="gray.600">{label}</Text>
      <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
        {value}
      </Text>
    </VStack>
  </Box>
);
