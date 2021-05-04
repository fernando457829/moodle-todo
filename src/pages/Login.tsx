import React from 'react';
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  FormErrorMessage,
  useToast,
  Container,
} from '@chakra-ui/react';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { authenticate, webservice } from '../services/moodle';

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
  const history = useHistory();

  const toast = useToast({
    position: 'bottom-right',
    status: 'error',
    isClosable: true,
    duration: 5000,
    title: 'Ocorreu um erro.',
  });

  console.log('sdfasdfasdfsdaf');

  return (
    <Container height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={
          async ({ email, password }, { setSubmitting }) => {
            const data = await authenticate(email, password);

            if (data.error) {
              toast({ description: data.error });
              setSubmitting(false);
              return;
            }

            const info = await webservice(data.token, 'core_webservice_get_site_info');

            if (info.error) {
              toast({ description: info.error });
              setSubmitting(false);
              return;
            }

            localStorage.setItem('user', JSON.stringify({
              token: data.token,
              id: info.userid,
            }));

            setSubmitting(false);

            history.push('/home');
          }
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field name="email">
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.email && touched.email)}>
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
                  <Input {...field} type="password" id="password" placeholder="Sua senha" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={isSubmitting}
              type="submit"
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
