import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

export type ScrollbarProps = BoxProps & {
  scrollbarColor?: BoxProps['color'];
};

export default function Scrollbar(props: ScrollbarProps) {
  const {
    background,
    backgroundColor,
    scrollbarColor,
    sx,
  } = props;

  const scrollbarBackground = background || backgroundColor || useColorModeValue('white', 'gray.800');
  const scrollbarThumbBackground = scrollbarColor || useColorModeValue('gray.300', 'gray.700');

  return (
    <Box
      {...props}
      overflowX="hidden"
      overflowY="auto"
      background=""
      sx={{
        ...sx,

        '::-webkit-scrollbar': {
          background: scrollbarBackground,
          width: '1rem',
        },

        '::-webkit-scrollbar-thumb': {
          borderStyle: 'solid',
          borderWidth: '0.25rem',
          borderColor: scrollbarBackground,
          background: scrollbarThumbBackground,
        },
      }}
    />
  );
}
