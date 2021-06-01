import React, { useEffect, useState } from 'react';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';

import { FaCheck } from 'react-icons/fa';
import { StateInfo } from '../../shared/types/UpdateManagerApi';
import BarButton, { BarButtonProps } from './BarButton';

export default function UpdateNotification(props: BarButtonProps) {
  const { color } = props;

  const [version, setVersion] = useState<string>();
  const [state, setState] = useState<StateInfo>();
  const updateColor = useColorModeValue('green.600', 'green.400');

  useEffect(() => {
    window.updateManager.getVersion().then(setVersion);

    window.updateManager.addStateChangeListener(setState);

    return () => {
      window.updateManager.removeStateChangeListener(setState);
    };
  }, []);

  if (!state && !version) return null;

  if (state && state.type !== 'up-to-date') {
    return (
      <BarButton
        {...props}
        onClick={() => state.type === 'ready-to-update' && window.updateManager.install()}
        color={state.type === 'ready-to-update' ? updateColor : color}
      >
        {
          state.type === 'ready-to-update'
            ? <Box marginRight="1"><FaCheck /></Box>
            : <Spinner size="xs" marginRight="2" thickness="1px" />
        }
        {
          (() => {
            switch (state.type) {
              case 'checking-for-update':
                return 'Procurando por atualizações...';
              case 'download':
                return `Baixando atualização (${state.percent}%)`;
              case 'ready-to-update':
                return 'Pronto para instalar';
              default:
                return 'Valor inesperado';
            }
          })()
        }
      </BarButton>
    );
  }

  return (
    <BarButton
      onClick={() => window.updateManager.checkForUpdate()}
      {...props}
    >
      {version}
    </BarButton>
  );
}
