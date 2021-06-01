import React, { memo } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import BarButton from './BarButton';

function FooterBar() {
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const buttonBackgroundColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      zIndex="3"
      width="full"
      height="6"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      backgroundColor={backgroundColor}
    >
      <BarButton
        hoverBackgroundColor={buttonBackgroundColor}
        color="gray.500"
        fontSize="12px"
        onClick={() => {}}
      >
        v0.1.0
      </BarButton>
      <BarButton
        hoverBackgroundColor={buttonBackgroundColor}
        color="gray.500"
        fontSize="12px"
        onClick={() => {}}
      >
        Criado por fernando457829
      </BarButton>
    </Box>
  );
}

export default memo(FooterBar);
