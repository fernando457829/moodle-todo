import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import createDataReducer from './hooks/createDataReducer';
import { DataProvider } from './contexts/DataContext';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

function App() {
  const [state, dispatch] = createDataReducer();

  return (
    <ChakraProvider>
      <DataProvider value={{ state, dispatch }}>
        <Router />
      </DataProvider>
    </ChakraProvider>
  );
}

render(<App />, mainElement);
