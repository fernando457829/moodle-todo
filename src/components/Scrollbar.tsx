import React, { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

export type ScrollbarProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  background?: string;
  thumbBackground?: string;
};

export default function Scrollbar({
  height,
  width,
  children,
  background: customBackground,
  thumbBackground: customThumbBackground,
}: ScrollbarProps) {
  const background = customBackground || useColorModeValue('white', 'var(--chakra-colors-gray-800)');
  const thumbBackground = customThumbBackground || useColorModeValue('var(--chakra-colors-gray-300)', '#FFFFFF16');

  return (
    <Box
      overflowX="hidden"
      overflowY="auto"
      width={width}
      height={height}
      css={{
        '::-webkit-scrollbar': {
          background,
          width: '1rem',
        },

        '::-webkit-scrollbar-thumb': {
          border: `solid 4px ${background}`,
          background: thumbBackground,
        },
      }}
    >
      {children}
    </Box>
  );
}
