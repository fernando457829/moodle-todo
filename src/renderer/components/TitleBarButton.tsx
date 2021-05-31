import React, { MouseEventHandler, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export type TitleBarButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement> & MouseEventHandler<HTMLButtonElement>;
  backgroundColor: string;
  color?: string;
};

export default function TitleBarButton({
  children,
  onClick,
  backgroundColor,
  color,
}: TitleBarButtonProps) {
  return (
    <Box
      role="button"
      height="100%"
      paddingRight="2"
      paddingLeft="2"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        WebkitAppRegion: 'no-drag',
        _hover: {
          cursor: 'pointer',
          backgroundColor,
          color,
        },
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
