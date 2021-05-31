import React, { memo, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from 'react-icons/vsc';
import { useToggle } from 'react-use';

import TitleBarButton from './TitleBarButton';

function TitleBar() {
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const buttonBackgroundColor = useColorModeValue('white', 'gray.800');
  const [isMaximazed, toggleIsMaximazed] = useToggle(false);

  useEffect(() => {
    function handleUnmaximize() {
      toggleIsMaximazed(false);
    }

    function handleMaximize() {
      toggleIsMaximazed(true);
    }

    window.windowManager.isMaximized().then((value) => toggleIsMaximazed(value));

    window.windowManager.addMaximizeListener(handleMaximize);
    window.windowManager.addUnmaximizeListener(handleUnmaximize);

    return () => {
      window.windowManager.removeMaximizeListener(handleMaximize);
      window.windowManager.removeUnmaximizeListener(handleUnmaximize);
    };
  }, []);

  return (
    <Box
      top="0"
      left="0"
      right="0"
      zIndex="3"
      position="sticky"
      width="full"
      height="6"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      backgroundColor={backgroundColor}
      sx={{
        WebkitAppRegion: 'drag',
        WebkitUserSelect: 'none',
      }}
    >
      <TitleBarButton
        onClick={() => window.windowManager.minimize()}
        backgroundColor={buttonBackgroundColor}
      >
        <VscChromeMinimize />
      </TitleBarButton>
      <TitleBarButton
        onClick={
          () => {
            if (isMaximazed) window.windowManager.restore();
            else window.windowManager.maximize();
          }
        }
        backgroundColor={buttonBackgroundColor}
      >
        {isMaximazed ? <VscChromeRestore /> : <VscChromeMaximize />}
      </TitleBarButton>
      <TitleBarButton
        onClick={() => window.windowManager.close()}
        backgroundColor="red"
        color="white"
      >
        <VscChromeClose />
      </TitleBarButton>
    </Box>
  );
}

export default memo(TitleBar);
