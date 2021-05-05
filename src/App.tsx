import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';
import useDataReducer from './hooks/useDataReducer';
import DataContext from './contexts/DataContext';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

function App() {
  const [state, dispatch] = useDataReducer();

  return (
    <ChakraProvider>
      <DataContext.Provider value={{ state, dispatch }}>
        <Router />
      </DataContext.Provider>
    </ChakraProvider>
  );
}

render(<App />, mainElement);
