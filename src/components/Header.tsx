import React from 'react';
import {
  Container,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaSyncAlt } from 'react-icons/fa';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      width="100%"
      height="50px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Container>
        <Text>
          Moodle TODO
        </Text>
      </Container>
      <Container>
        <IconButton
          variant="ghost"
          aria-label="Atualizar"
        >
          <FaSyncAlt />
        </IconButton>
        <IconButton
          variant="ghost"
          aria-label="Mudar o tema"
          onClick={() => toggleColorMode()}
        >
          {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Container>
    </Container>
  );
}
