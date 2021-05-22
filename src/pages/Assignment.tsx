import React, { useEffect, useState } from 'react';
import {
  Center,
  Container,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';

import useData from '../hooks/useData';
import { Assignment as AssignmentType, Course } from '../types';

export default function Assignment() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { assignments, courses } = useData();
  const [assignment, setAssignment] = useState<AssignmentType>();
  const [course, setCourse] = useState<Course>();

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
    }
  }, [assignments, courses]);

  if (!assignment || !course) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Container>
      <Heading>{assignment.name}</Heading>
      <Text>{course.name}</Text>
    </Container>
  );
}
