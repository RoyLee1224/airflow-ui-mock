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
    <Box minH="100vh" bg="#f8fafc" data-testid="airflow-home-page">
      {/* Header - Airflow style */}
      <Box bg="#017cee" color="white" py={3} shadow="sm" borderBottom="1px solid" borderColor="blue.700">
        <Box maxW="1400px" mx="auto" px={6}>
          <Flex justify="space-between" align="center">
            <HStack gap={3}>
              <Box
                w={8}
                h={8}
                bg="white"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                color="#017cee"
                fontSize="lg"
              >
                A
              </Box>
              <Heading size="lg" fontWeight="semibold">Apache Airflow</Heading>
            </HStack>
            <HStack gap={4}>
              <Text fontSize="sm" opacity={0.9}>v2.8.0</Text>
              <Badge
                bg="green.500"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
                fontWeight="medium"
              >
                Production
              </Badge>
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Content */}
      <Box maxW="1400px" mx="auto" px={6} py={5}>
        <VStack alignItems="stretch" gap={5}>
          {/* Welcome Heading */}
          <Heading size="xl" fontWeight="semibold" color="gray.800">
            Welcome to Airflow
          </Heading>

          {/* DAG Stats Section */}
          <Box>
            <Heading size="md" mb={3} fontWeight="semibold" color="gray.700">
              DAG Stats
            </Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
              <StatCard label="Total DAGs" value={dagStats.total.toString()} color="#3b82f6" />
              <StatCard label="Active DAGs" value={dagStats.active.toString()} color="#10b981" />
              <StatCard label="Paused DAGs" value={dagStats.paused.toString()} color="#64748b" />
            </Grid>
          </Box>

          {/* Task Instance Stats */}
          <Box>
            <Heading size="md" mb={3} fontWeight="semibold" color="gray.700">
              Task Instance Stats
            </Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
              <StatCard label="Queued" value={taskStats.queued.toString()} color="#64748b" icon={<FaClock />} />
              <StatCard label="Running" value={taskStats.running.toString()} color="#3b82f6" icon={<FaSync />} />
              <StatCard label="Success" value={taskStats.success.toString()} color="#10b981" icon={<FaCheckCircle />} />
              <StatCard label="Failed" value={taskStats.failed.toString()} color="#ef4444" icon={<FaExclamationCircle />} />
            </Grid>
          </Box>

          {/* Favorite DAGs */}
          <Box bg="white" borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" p={5}>
            <HStack mb={4} gap={2}>
              <FaHeart color="#ef4444" size={18} />
              <Heading size="md" fontWeight="semibold" color="gray.700">
                Favorite DAGs
              </Heading>
            </HStack>
            <Table.Root size="sm" variant="outline"  striped>
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
                      <Text fontWeight="medium" color="gray.800">{dag.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        bg={dag.isPaused ? '#64748b' : '#10b981'}
                        color="white"
                        px={2}
                        py={0.5}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="medium"
                      >
                        {dag.isPaused ? 'Paused' : 'Active'}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">{dag.lastRunDate}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      {dag.lastRunState && (
                        <Badge
                          bg={
                            dag.lastRunState === 'success' ? '#10b981' :
                            dag.lastRunState === 'running' ? '#3b82f6' : '#ef4444'
                          }
                          color="white"
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          fontSize="xs"
                          fontWeight="medium"
                          textTransform="capitalize"
                        >
                          {dag.lastRunState}
                        </Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">{dag.nextRunDate}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack gap={1}>
                        <IconButton
                          aria-label="Trigger DAG"
                          size="xs"
                          variant="ghost"
                          color="#10b981"
                          _hover={{ bg: 'green.50' }}
                        >
                          <FaPlay size={12} />
                        </IconButton>
                        <IconButton
                          aria-label="Pause DAG"
                          size="xs"
                          variant="ghost"
                          color="#f59e0b"
                          _hover={{ bg: 'orange.50' }}
                        >
                          <FaPause size={12} />
                        </IconButton>
                        <IconButton
                          aria-label="Refresh DAG"
                          size="xs"
                          variant="ghost"
                          color="#3b82f6"
                          _hover={{ bg: 'blue.50' }}
                        >
                          <FaSync size={12} />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Health and Pool Summary */}
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={5}>
            {/* Health Status */}
            <GridItem>
              <Box bg="white" borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" p={5} h="100%">
                <Heading size="md" mb={4} fontWeight="semibold" color="gray.700">
                  Health
                </Heading>
                <VStack align="stretch" gap={2}>
                  {mockHealthChecks.map((check) => (
                    <Flex key={check.name} justify="space-between" align="center" p={3} borderRadius="md" bg="gray.50" border="1px solid" borderColor="gray.100">
                      <Text fontWeight="medium" color="gray.700">{check.name}</Text>
                      <HStack gap={2}>
                        <Box
                          w={2.5}
                          h={2.5}
                          borderRadius="full"
                          bg={check.status === 'healthy' ? '#10b981' : '#ef4444'}
                        />
                        <Text fontSize="sm" fontWeight="medium" color={check.status === 'healthy' ? '#10b981' : '#ef4444'}>
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
              <Box bg="white" borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" p={5} h="100%">
                <Heading size="md" mb={4} fontWeight="semibold" color="gray.700">
                  Pool Summary
                </Heading>
                <VStack align="stretch" gap={4}>
                  {mockPools.map((pool) => (
                    <Box key={pool.name}>
                      <Flex justify="space-between" mb={2}>
                        <Text fontWeight="medium" color="gray.700">{pool.name}</Text>
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                          {pool.runningSlots + pool.queuedSlots} / {pool.slots}
                        </Text>
                      </Flex>
                      <Box position="relative" h={2.5} bg="gray.200" borderRadius="full" overflow="hidden">
                        <Box
                          position="absolute"
                          h="100%"
                          bg="#3b82f6"
                          w={`${(pool.runningSlots / pool.slots) * 100}%`}
                        />
                        <Box
                          position="absolute"
                          h="100%"
                          bg="#f59e0b"
                          left={`${(pool.runningSlots / pool.slots) * 100}%`}
                          w={`${(pool.queuedSlots / pool.slots) * 100}%`}
                        />
                      </Box>
                      <Flex gap={4} mt={2} fontSize="xs" color="gray.600">
                        <HStack gap={1.5}>
                          <Box w={2.5} h={2.5} bg="#3b82f6" borderRadius="sm" />
                          <Text fontWeight="medium">Running: {pool.runningSlots}</Text>
                        </HStack>
                        <HStack gap={1.5}>
                          <Box w={2.5} h={2.5} bg="#f59e0b" borderRadius="sm" />
                          <Text fontWeight="medium">Queued: {pool.queuedSlots}</Text>
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
    shadow="sm"
    border="1px solid"
    borderColor="gray.200"
    data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    _hover={{ shadow: 'md', borderColor: 'gray.300' }}
    transition="all 0.2s"
  >
    <Flex align="center" gap={3}>
      {icon && (
        <Box
          fontSize="2xl"
          color={color}
          p={2}
          bg={`${color}15`}
          borderRadius="md"
        >
          {icon}
        </Box>
      )}
      <VStack align="flex-start" gap={0.5} flex={1}>
        <Text fontSize="xs" color="gray.600" fontWeight="medium" textTransform="uppercase">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {value}
        </Text>
      </VStack>
    </Flex>
  </Box>
);
