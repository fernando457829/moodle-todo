import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import createDataReducer from './creators/createDataReducer';
import { DataProvider } from './contexts/DataContext';
import theme from './styles/theme';
import TitleBar from './components/TitleBar';
import Scrollbar from './components/Scrollbar';
import FooterBar from './components/FooterBar';

export default function App() {
  const [state, dispatch] = createDataReducer();

  return (
    <ChakraProvider theme={theme}>
      <TitleBar />
      <Scrollbar height="calc(100vh - 3rem)">
        <DataProvider value={{ state, dispatch }}>
          <Router />
        </DataProvider>
      </Scrollbar>
      <FooterBar />
    </ChakraProvider>
  );
}
