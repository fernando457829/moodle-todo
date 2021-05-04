import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Router from './Router';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');

document.body.appendChild(mainElement);

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

render(<App />, mainElement);
