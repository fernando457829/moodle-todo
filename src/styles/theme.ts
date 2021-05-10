import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export default extendTheme(withDefaultColorScheme({ colorScheme: 'orange' }), {
  config: {
    initialColorMode: 'dark',
  },
});
