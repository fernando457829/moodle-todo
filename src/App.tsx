import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import createDataReducer from './creators/createDataReducer';
import { DataProvider } from './contexts/DataContext';
import theme from './styles/theme';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

function App() {
  const [state, dispatch] = createDataReducer();

  return (
    <ChakraProvider theme={theme}>
      <DataProvider value={{ state, dispatch }}>
        <Router />
      </DataProvider>
    </ChakraProvider>
  );
}

render(<App />, mainElement);
