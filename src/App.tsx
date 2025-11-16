import { AirflowHomePage } from './components/AirflowHomePage'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AirflowHomePage />
    </ChakraProvider>
  )
}

export default App
