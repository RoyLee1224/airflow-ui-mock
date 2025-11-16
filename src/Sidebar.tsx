// src/Sidebar.tsx
import { VStack, Box, Text, Image } from '@chakra-ui/react';
import { MdHome, MdSettings, MdHelp } from 'react-icons/md';
import logoImg from './assets/logo.png';

const NavButton = ({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) => {
  return (
    <Box
      w="14"
      h="14"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      bg={active ? "blue.500" : "transparent"}
      color={active ? "white" : "gray.600"}
      cursor="pointer"
      _hover={{ bg: active ? "blue.600" : "gray.200" }}
      title={label}
    >
      <Icon size={24} />
    </Box>
  );
};

function Sidebar() {
  return (
    <VStack
      as="nav"
      position="fixed"
      top="0"
      left="0"
      h="100%"
      w="16"
      p={2}
      bg="gray.100"
      gap={2}
      align="center"
      justifyContent="space-between"
    >
      <VStack gap={2} align="center" w="100%">
        {/* Airflow Logo */}
        <Box h="12" w="12" display="flex" alignItems="center" justifyContent="center">
          <Image src={logoImg} alt="Airflow Logo" w="100%" h="100%" objectFit="contain" />
        </Box>

        <NavButton icon={MdHome} label="Home" active={true} />
        <NavButton icon={MdSettings} label="DAGs" />
      </VStack>

      <VStack gap={2} align="center" w="100%">
        <NavButton icon={MdHelp} label="Docs" />
      </VStack>
    </VStack>
  );
}

export default Sidebar;
