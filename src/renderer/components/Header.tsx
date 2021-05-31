import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaSyncAlt } from 'react-icons/fa';

export default function Header() {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Container
      maxWidth="container.xl"
      height="50px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text>
          Moodle TODO
        </Text>
      </Box>
      <Box>
        <IconButton
          variant="ghost"
          aria-label="Atualizar"
          icon={<FaSyncAlt />}
        />
        <IconButton
          variant="ghost"
          aria-label="Mudar o tema"
          onClick={() => toggleColorMode()}
          icon={<SwitchIcon />}
        />
      </Box>
    </Container>
  );
}
