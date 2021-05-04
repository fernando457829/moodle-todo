import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { webservice } from '../services/moodle';

type User = {
  id: number;
  token: string;
};

type Course = {
  id: number;
  name: string;
};

type Assignment = {
  id: number;
  name: string;
  courseid: number;
  done: boolean;
};

export default function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');

    if (!rawUser) history.push('/login');

    setUser(JSON.parse(rawUser!));
  }, []);

  useEffect(() => {
    if (!user) return;

    const rawCourses = localStorage.getItem('courses');

    if (!rawCourses) {
      webservice(
        user!.token,
        'core_enrol_get_users_courses',
        {
          userid: user!.id,
        },
      ).then((apiCourses) => {
        const formattedCourses = apiCourses.map((course: any) => ({
          id: course.id,
          name: course.fullname,
        }));

        setCourses(formattedCourses);
        localStorage.setItem('courses', JSON.stringify(formattedCourses));
      });
    } else setCourses(JSON.parse(rawCourses));
  }, [user]);

  useEffect(() => {
    if (!courses.length) return;

    const rawAssignments = localStorage.getItem('assignments');
    const lastUpdate = localStorage.getItem('lastUpdate');

    const needUpdate = lastUpdate
    && new Date().getTime() / 1000 - Number(lastUpdate) > 24 * 60 * 60;

    if (!rawAssignments || needUpdate) {
      webservice(
        user!.token,
        'core_calendar_get_calendar_events',
        {
          events: {
            courseids: courses.map((course) => course.id),
          },

          options: {
            siteevents: 0,
            timestart: Math.floor(new Date().getTime() / 1000),
          },
        },
      ).then(({ events }: { events: any[] }) => {
        const assigns = events
          .filter((event) => event.modulename === 'assign')
          .map(({ id, courseid, name }) => ({
            id,
            courseid,
            name,
            done: false,
          }));

        if (needUpdate) {
          const updatedAssignments: Assignment[] = [];
          const allAssignments = [...JSON.parse(rawAssignments!), ...assigns];

          allAssignments.forEach((assignment) => {
            if (updatedAssignments.findIndex((a) => a.id === assignment.id) === -1) {
              updatedAssignments.push(assignment);
            }
          });
        } else {
          setAssignments(assigns);
          localStorage.setItem('assignments', JSON.stringify(assigns));
        }

        localStorage.setItem('lastUpdate', String(new Date().getTime() / 1000));

        setLoading(false);
      });
    } else {
      setAssignments(JSON.parse(rawAssignments));
      setLoading(false);
    }
  }, [user, courses]);

  function handleDone(id: number) {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === id) {
        return {
          ...assignment,
          done: true,
        };
      }

      return assignment;
    });

    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  }

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Container>
      {
        assignments.filter(({ done }) => !done).map(({ id, courseid, name }) => (
          <Box
            key={String(id)}
            maxW="sm"
            border="1px"
            borderColor="blackAlpha.700"
            borderRadius="10px"
            marginBottom="20px"
            padding="10px"
          >
            <Box display="flex" justifyContent="space-between" flexDirection="row">
              <Heading size="md">{name}</Heading>
              <Button colorScheme="green" onClick={() => handleDone(id)}>
                <CheckIcon />
              </Button>
            </Box>
            <Text>{courses.find((course) => course.id === courseid)!.name}</Text>
          </Box>
        ))
      }
    </Container>
  );
}
