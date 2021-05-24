/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
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

import useData from '../hooks/useData';
import { Assignment as AssignmentType, Course } from '../types';
import { webservice } from '../services/moodle';

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
  const [submission, setSubmission] = useState<any>();

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
        setSubmission(lastattempt);
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
    </Box>
  );
}
