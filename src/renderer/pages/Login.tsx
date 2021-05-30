import React, { useEffect } from 'react';
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  FormErrorMessage,
  useToast,
  Heading,
  Box,
  InputRightElement,
  IconButton,
  InputGroup,
} from '@chakra-ui/react';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { authenticate, webservice } from '../services/moodle';
import useData from '../hooks/useData';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('O e-mail é inválido')
    .required('Este campo é obrigatório'),
  password: yup
    .string()
    .required('Este campo é obrigatório'),
});

export default function Login() {
  const { url, user, dispatch } = useData();
  const history = useHistory();
  const toast = useToast({
    position: 'bottom-right',
    status: 'error',
    isClosable: true,
    duration: 5000,
    title: 'Ocorreu um erro.',
  });
  const [showPassword, toggleShowPassword] = useToggle(false);

  useEffect(() => {
    if (!url) {
      history.push('/url');
      return;
    }

    if (user) history.push('/');
  }, []);

  return (
    <Box
      height="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom="6">Entrar na sua conta</Heading>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={
          async ({ email, password }, { setSubmitting }) => {
            const data = await authenticate(url!, email, password);

            if (data.error) {
              toast({ description: data.error });
              setSubmitting(false);
              return;
            }

            const info = await webservice(url!, data.token, 'core_webservice_get_site_info');

            if (info.error) {
              toast({ description: info.error });
              setSubmitting(false);
              return;
            }

            dispatch({
              type: 'add_user',
              user: {
                id: info.userid,
                token: data.token,
              },
            });

            setSubmitting(false);

            history.push('/');
          }
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Box as={Form} width="100%" maxWidth="sm">
            <Field name="email">
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.email && touched.email)} marginBottom="4">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input {...field} id="email" placeholder="Seu e-mail" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.password && touched.password)}>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Sua senha"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'esconder' : 'mostrar'}
                        onClick={toggleShowPassword}
                        variant="ghost"
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Box marginTop="4" display="flex" justifyContent="flex-end">
              <Button
                isLoading={isSubmitting}
                type="submit"
              >
                Entrar
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
