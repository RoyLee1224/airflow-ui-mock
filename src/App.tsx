// src/App.tsx
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f5f5f5' }}>
      <Flex>
        {/* 左側導航欄 */}
        <Sidebar />

        {/* 右側主內容區 */}
        <Box
          flex="1"
          ml="16"
          height="100vh"
          overflow="auto"
        >
          <Dashboard />
        </Box>
      </Flex>
    </div>
  );
}

export default App;