import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import createDataReducer from './creators/createDataReducer';
import { DataProvider } from './contexts/DataContext';
import theme from './styles/theme';
import TitleBar from './components/TitleBar';
import Fonts from './components/Fonts';
import Scrollbar from './components/Scrollbar';

export default function App() {
  const [state, dispatch] = createDataReducer();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <TitleBar />
      <Scrollbar height="calc(100vh - 1.5rem)">
        <DataProvider value={{ state, dispatch }}>
          <Router />
        </DataProvider>
      </Scrollbar>
    </ChakraProvider>
  );
}
