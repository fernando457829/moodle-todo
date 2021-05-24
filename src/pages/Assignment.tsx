/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { sanitize } from 'dompurify';
import { useHistory, useParams } from 'react-router-dom';
import {
  FaArrowLeft,
  FaFilePdf,
  FaFile,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
} from 'react-icons/fa';
import * as yup from 'yup';
import { Form, Formik } from 'formik';

import useData from '../hooks/useData';
import { Assignment as AssignmentType, Course, Submission } from '../types';
import { upload, webservice } from '../services/moodle';

const validationSchema = yup.object({
  file: yup.mixed()
    .test('size', 'O arquivo é muito grande. Máximo: 2MB', (value) => (value?.size || 0) <= 2000000)
    .required('É necessário um arquivo'),
});

export default function Assignment() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const {
    assignments,
    courses,
    url,
    user,
  } = useData();
  const [assignment, setAssignment] = useState<AssignmentType>();
  const [course, setCourse] = useState<Course>();
  const [submission, setSubmission] = useState<Submission>();

  useEffect(() => {
    if (!assignment && !course) {
      const findedAssignment = assignments?.find((assign) => assign.id === Number(id));

      if (!findedAssignment) {
        history.push('/');
        return;
      }

      setAssignment(findedAssignment);

      const findedCourse = courses?.find((value) => value.id === findedAssignment.courseid);

      if (!findedCourse) {
        history.push('/');
        return;
      }

      setCourse(findedCourse);

      webservice(
        url!,
        user!.token,
        'mod_assign_get_submission_status',
        {
          assignid: findedAssignment.id,
        },
      ).then(({ lastattempt }) => {
        setSubmission({
          status: lastattempt.submission.status,
          plugins: (lastattempt.submission.plugins as any[])?.map((plugin) => ({
            type: plugin.type,
            name: plugin.name,
            text: plugin.editorfields?.[0].text,
            files: (plugin.fileareas?.[0].files as any[])?.map((attachment) => ({
              filename: attachment.filename,
              fileurl: attachment.fileurl,
              mimetype: attachment.mimetype,
            })),
          })),
        });
      });
    }
  }, [assignments, courses]);

  if (!assignment || !course || !submission) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <FaArrowLeft onClick={() => history.push('/')} />
      <Heading>{assignment.name}</Heading>
      <Text>{course.name}</Text>
      <div dangerouslySetInnerHTML={{ __html: sanitize(assignment.description) }} />
      {
        assignment.attachments?.map((attachment) => (
          <Box key={attachment.fileurl} display="flex" flexDirection="row">
            {
              (() => {
                switch (attachment.mimetype) {
                  case 'application/pdf':
                    return <FaFilePdf />;
                  case 'application/msword':
                  case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    return <FaFileWord />;
                  case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    return <FaFilePowerpoint />;
                  case 'image/jpeg':
                  case 'image/png':
                    return <FaFileImage />;
                  default:
                    return <FaFile />;
                }
              })()
            }
            <Link href={attachment.fileurl}>{attachment.filename}</Link>
          </Box>
        ))
      }
      <Text>
        Status:
        {' '}
        {submission.status}
      </Text>
      {
        submission.plugins?.map((plugin) => (
          <Box key={plugin.name}>
            <Text>
              {plugin.name}
              {' '}
              -
              {' '}
              {plugin.type}
            </Text>
            {
              plugin.text
                && <div dangerouslySetInnerHTML={{ __html: sanitize(plugin.text) }} />
            }
            {
              plugin.files?.map((file) => (
                <Box key={file.fileurl} display="flex" flexDirection="row">
                  {
                    (() => {
                      switch (file.mimetype) {
                        case 'application/pdf':
                          return <FaFilePdf />;
                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                          return <FaFileWord />;
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                          return <FaFilePowerpoint />;
                        case 'image/jpeg':
                        case 'image/png':
                          return <FaFileImage />;
                        default:
                          return <FaFile />;
                      }
                    })()
                  }
                  <Link href={file.fileurl}>{file.filename}</Link>
                </Box>
              ))
            }
          </Box>
        ))
      }
      <Formik
        initialValues={{
          file: {} as any,
        } as { file: File }}
        validationSchema={validationSchema}
        onSubmit={
            async ({ file }, { setSubmitting }) => {
              const data = await upload(url!, user!.token, file);

              await webservice(
                url!,
                user!.token,
                'mod_assign_save_submission',
                {
                  assignmentid: assignment.id,
                  plugindata: {
                    files_filemanager: data[0].itemid,
                  },
                },
              );

              setSubmitting(false);
            }
        }
      >
        {({
          isSubmitting,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Box as={Form} width="100%" maxWidth="sm">
            <FormControl isInvalid={Boolean(errors.file && touched.file)}>
              <FormLabel htmlFor="file">Enviar arquivo</FormLabel>
              <Input
                onChange={(event) => setFieldValue('file', event.currentTarget.files?.[0])}
                name="file"
                type="file"
                id="file"
              />
              <FormErrorMessage>{errors.file}</FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit">
              Enviar
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
