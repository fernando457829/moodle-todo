import React, { memo, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from 'react-icons/vsc';
import { ipcRenderer } from 'electron';

import useToggleValue from '../hooks/useToggleValue';
import TitleBarButton from './TitleBarButton';

function TitleBar() {
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');
  const buttonBackgroundColor = useColorModeValue('white', 'gray.800');
  const [MiddleIcon, toggleIsMaximazed] = useToggleValue(VscChromeRestore, VscChromeMaximize);

  useEffect(() => {
    function handleUnmaximize() {
      toggleIsMaximazed(false);
    }

    function handleMaximize() {
      toggleIsMaximazed(true);
    }

    ipcRenderer.invoke('window-is-maximized').then((value: boolean) => toggleIsMaximazed(value));

    ipcRenderer.addListener('unmaximize', handleUnmaximize);
    ipcRenderer.addListener('maximize', handleMaximize);

    return () => {
      ipcRenderer.removeListener('unmaximize', handleUnmaximize);
      ipcRenderer.removeListener('maximize', handleMaximize);
    };
  }, []);

  function handleMiddleIconClick() {
    ipcRenderer.invoke('window-maximize');
    toggleIsMaximazed();
  }

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
        onClick={() => ipcRenderer.invoke('window-minimize')}
        backgroundColor={buttonBackgroundColor}
      >
        <VscChromeMinimize />
      </TitleBarButton>
      <TitleBarButton
        onClick={handleMiddleIconClick}
        backgroundColor={buttonBackgroundColor}
      >
        <MiddleIcon />
      </TitleBarButton>
      <TitleBarButton onClick={() => ipcRenderer.invoke('window-close')} backgroundColor="red" color="white">
        <VscChromeClose />
      </TitleBarButton>
    </Box>
  );
}

export default memo(TitleBar);
