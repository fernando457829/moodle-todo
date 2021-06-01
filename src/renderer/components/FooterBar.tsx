import React, { memo } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import BarButton from './BarButton';
import UpdateNotification from './UpdateNotification';

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
      <UpdateNotification
        hoverBackgroundColor={buttonBackgroundColor}
        color="gray.500"
        fontSize="12px"
      />
      <BarButton
        hoverBackgroundColor={buttonBackgroundColor}
        color="gray.500"
        fontSize="12px"
        onClick={() => window.open('https://github.com/fernando457829', '_blank')}
      >
        Criado por fernando457829
      </BarButton>
    </Box>
  );
}

export default memo(FooterBar);
