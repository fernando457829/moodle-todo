import React from 'react';
import { render } from 'react-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import createDataReducer from './creators/createDataReducer';
import { DataProvider } from './contexts/DataContext';
import theme from './styles/theme';
import TitleBar from './components/TitleBar';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

function App() {
  const [state, dispatch] = createDataReducer();

  return (
    <ChakraProvider theme={theme}>
      <TitleBar />
      <Box height="calc(100vh - 1.5rem)" overflowX="hidden" overflowY="auto">
        <DataProvider value={{ state, dispatch }}>
          <Router />
        </DataProvider>
      </Box>
    </ChakraProvider>
  );
}

render(<App />, mainElement);
