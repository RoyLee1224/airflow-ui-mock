import { Box, Flex, Heading, Text, Badge, Table, IconButton, HStack, VStack, Grid, GridItem } from '@chakra-ui/react';
import { FaPlay, FaPause, FaSync, FaHeart, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa';

interface DAG {
  id: string;
  name: string;
  isPaused: boolean;
  lastRunState: 'success' | 'running' | 'failed' | null;
  lastRunDate: string;
  nextRunDate: string;
  isFavorite?: boolean;
}

interface HealthCheck {
  name: string;
  status: 'healthy' | 'unhealthy';
  message?: string;
}

interface Pool {
  name: string;
  slots: number;
  runningSlots: number;
  queuedSlots: number;
}

// Mock data
const mockDAGs: DAG[] = [
  { id: '1', name: 'example_bash_operator', isPaused: false, lastRunState: 'success', lastRunDate: '2025-11-16 10:30', nextRunDate: '2025-11-16 11:30', isFavorite: true },
  { id: '2', name: 'data_pipeline_etl', isPaused: false, lastRunState: 'running', lastRunDate: '2025-11-16 10:00', nextRunDate: '2025-11-16 12:00', isFavorite: true },
  { id: '3', name: 'ml_model_training', isPaused: false, lastRunState: 'failed', lastRunDate: '2025-11-16 09:45', nextRunDate: '2025-11-16 13:00', isFavorite: true },
  { id: '4', name: 'daily_report_generator', isPaused: true, lastRunState: 'success', lastRunDate: '2025-11-15 23:00', nextRunDate: '-', isFavorite: false },
  { id: '5', name: 'sensor_check_task', isPaused: false, lastRunState: null, lastRunDate: 'Never', nextRunDate: '2025-11-16 14:00', isFavorite: false },
];

const mockHealthChecks: HealthCheck[] = [
  { name: 'Scheduler', status: 'healthy' },
  { name: 'Database', status: 'healthy' },
  { name: 'Triggerer', status: 'healthy' },
  { name: 'DAG Processor', status: 'healthy' },
];

const mockPools: Pool[] = [
  { name: 'default_pool', slots: 128, runningSlots: 45, queuedSlots: 12 },
  { name: 'high_priority', slots: 32, runningSlots: 8, queuedSlots: 2 },
  { name: 'batch_processing', slots: 64, runningSlots: 32, queuedSlots: 5 },
];

const dagStats = {
  total: 24,
  paused: 1,
  active: 23,
};

const taskStats = {
  queued: 19,
  running: 45,
  success: 1234,
  failed: 5,
};

export const AirflowHomePage = () => {
  const favoriteDags = mockDAGs.filter(dag => dag.isFavorite);

  return (
    <Box minH="100vh" bg="gray.50" data-testid="airflow-home-page">
      {/* Header */}
      <Box bg="blue.600" color="white" py={4} shadow="md">
        <Box maxW="1400px" mx="auto" px={4}>
          <Flex justify="space-between" align="center">
            <Heading size="lg">Apache Airflow</Heading>
            <HStack gap={4}>
              <Text fontSize="sm">v2.8.0</Text>
              <Badge colorScheme="green">Production</Badge>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Content */}
      <Box maxW="1400px" mx="auto" px={4} py={6}>
        <VStack alignItems="stretch" gap={6}>
          {/* Welcome Heading */}
          <Heading size="2xl">Welcome to Airflow</Heading>

          {/* DAG Stats Section */}
          <Box>
            <Heading size="md" mb={4}>DAG Stats</Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <StatCard label="Total DAGs" value={dagStats.total.toString()} color="blue" />
              <StatCard label="Active DAGs" value={dagStats.active.toString()} color="green" />
              <StatCard label="Paused DAGs" value={dagStats.paused.toString()} color="gray" />
            </Grid>
          </Box>

          {/* Task Instance Stats */}
          <Box>
            <Heading size="md" mb={4}>Task Instance Stats</Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <StatCard label="Queued" value={taskStats.queued.toString()} color="orange" icon={<FaClock />} />
              <StatCard label="Running" value={taskStats.running.toString()} color="blue" icon={<FaSync />} />
              <StatCard label="Success" value={taskStats.success.toString()} color="green" icon={<FaCheckCircle />} />
              <StatCard label="Failed" value={taskStats.failed.toString()} color="red" icon={<FaExclamationCircle />} />
            </Grid>
          </Box>

          {/* Favorite DAGs */}
          <Box bg="white" borderRadius="lg" shadow="md" p={6}>
            <HStack mb={4}>
              <FaHeart color="#E53E3E" />
              <Heading size="md">Favorite DAGs</Heading>
            </HStack>
            <Table.Root size="sm" variant="line">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>DAG Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Last Run</Table.ColumnHeader>
                  <Table.ColumnHeader>Last Run State</Table.ColumnHeader>
                  <Table.ColumnHeader>Next Run</Table.ColumnHeader>
                  <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {favoriteDags.map((dag) => (
                  <Table.Row key={dag.id} data-testid={`dag-row-${dag.id}`}>
                    <Table.Cell>
                      <Text fontWeight="medium">{dag.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorScheme={dag.isPaused ? 'gray' : 'green'}>
                        {dag.isPaused ? 'Paused' : 'Active'}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">{dag.lastRunDate}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      {dag.lastRunState && (
                        <Badge colorScheme={
                          dag.lastRunState === 'success' ? 'green' :
                          dag.lastRunState === 'running' ? 'blue' : 'red'
                        }>
                          {dag.lastRunState}
                        </Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">{dag.nextRunDate}</Text>
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

          {/* Health and Pool Summary */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            {/* Health Status */}
            <GridItem>
              <Box bg="white" borderRadius="lg" shadow="md" p={6} h="100%">
                <Heading size="md" mb={4}>Health</Heading>
                <VStack align="stretch" gap={3}>
                  {mockHealthChecks.map((check) => (
                    <Flex key={check.name} justify="space-between" align="center" p={2} borderRadius="md" bg="gray.50">
                      <Text fontWeight="medium">{check.name}</Text>
                      <HStack>
                        <Box
                          w={3}
                          h={3}
                          borderRadius="full"
                          bg={check.status === 'healthy' ? 'green.500' : 'red.500'}
                        />
                        <Text fontSize="sm" color={check.status === 'healthy' ? 'green.600' : 'red.600'}>
                          {check.status === 'healthy' ? 'Healthy' : 'Unhealthy'}
                        </Text>
                      </HStack>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </GridItem>

            {/* Pool Summary */}
            <GridItem>
              <Box bg="white" borderRadius="lg" shadow="md" p={6} h="100%">
                <Heading size="md" mb={4}>Pool Summary</Heading>
                <VStack align="stretch" gap={4}>
                  {mockPools.map((pool) => (
                    <Box key={pool.name}>
                      <Flex justify="space-between" mb={2}>
                        <Text fontWeight="medium">{pool.name}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {pool.runningSlots + pool.queuedSlots} / {pool.slots}
                        </Text>
                      </Flex>
                      <Box position="relative" h={2} bg="gray.200" borderRadius="full" overflow="hidden">
                        <Box
                          position="absolute"
                          h="100%"
                          bg="blue.500"
                          w={`${(pool.runningSlots / pool.slots) * 100}%`}
                        />
                        <Box
                          position="absolute"
                          h="100%"
                          bg="orange.300"
                          left={`${(pool.runningSlots / pool.slots) * 100}%`}
                          w={`${(pool.queuedSlots / pool.slots) * 100}%`}
                        />
                      </Box>
                      <Flex gap={4} mt={1} fontSize="xs" color="gray.600">
                        <HStack gap={1}>
                          <Box w={2} h={2} bg="blue.500" borderRadius="sm" />
                          <Text>Running: {pool.runningSlots}</Text>
                        </HStack>
                        <HStack gap={1}>
                          <Box w={2} h={2} bg="orange.300" borderRadius="sm" />
                          <Text>Queued: {pool.queuedSlots}</Text>
                        </HStack>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}

const StatCard = ({ label, value, color, icon }: StatCardProps) => (
  <Box
    bg="white"
    p={4}
    borderRadius="lg"
    shadow="md"
    data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <Flex align="center" gap={3}>
      {icon && <Box fontSize="2xl" color={`${color}.500`}>{icon}</Box>}
      <VStack align="flex-start" gap={0} flex={1}>
        <Text fontSize="sm" color="gray.600">{label}</Text>
        <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`}>
          {value}
        </Text>
      </VStack>
    </Flex>
  </Box>
);
