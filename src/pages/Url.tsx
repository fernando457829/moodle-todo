import React, { useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import {
  Field,
  FieldProps,
  Form,
  Formik,
} from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import { FaChevronRight } from 'react-icons/fa';
import api from '../services/moodle';
import useData from '../hooks/useData';

const validationSchema = yup.object({
  url: yup
    .string()
    .url('A url é inválido')
    .required('Este campo é obrigatório'),
});

export default function Url() {
  const history = useHistory();
  const { url, dispatch } = useData();
  const toast = useToast({
    position: 'bottom-right',
    status: 'error',
    isClosable: true,
    duration: 5000,
    title: 'Ocorreu um erro.',
  });

  useEffect(() => {
    if (url) history.push('/login');
  }, []);

  return (
    <Container height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Formik
        initialValues={{
          url: '',
        }}
        validationSchema={validationSchema}
        onSubmit={
          (values, { setSubmitting }) => api.post(`${values.url}/login/token.php`)
            .then(({ status }) => {
              if (status !== 200) throw new Error();

              dispatch({ type: 'add_url', url: values.url });

              setSubmitting(false);

              history.push('/login');
            })
            .catch(() => {
              toast({ description: 'Site inválido ou inexistente' });
              setSubmitting(false);
            })
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field name="url">
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.url && touched.url)}>
                  <FormLabel htmlFor="url">Url da escola</FormLabel>
                  <Input {...field} id="url" placeholder="https://moodle.exemplo.com.br" />
                  <FormErrorMessage>{errors.url}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={isSubmitting}
              type="submit"
              rightIcon={<FaChevronRight />}
            >
              Entrar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
