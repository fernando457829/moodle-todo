import React from 'react';
import { Global } from '@emotion/react';

export default function Fonts() {
  return (
    <Global
      styles={`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
      `}
    />
  );
}
