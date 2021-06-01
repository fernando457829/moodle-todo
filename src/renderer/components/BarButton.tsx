import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export type BarButtonProps = BoxProps & {
  hoverBackgroundColor: string;
  hoverColor?: string;
};

export default function BarButton(props: BarButtonProps) {
  const { hoverBackgroundColor, hoverColor } = props;

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
          backgroundColor: hoverBackgroundColor,
          color: hoverColor,
        },
      }}
      {...props}
    />
  );
}
