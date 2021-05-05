import { Reducer } from 'react';
import {
  Assignment,
  Course,
  Data,
  User,
} from '../types';

export type Action =
  | { type: 'add_user', user: User }
  | { type: 'add_courses', courses: Course[] }
  | { type: 'add_assignments', assignments: Assignment[], time: number }
  | { type: 'update_assignments', assignments: Assignment[], time: number }
  | { type: 'done_assignment', id: number };

export type State = Partial<Data>;

export type DataReducer = Reducer<State, Action>;

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add_user':
      return { ...state, user: action.user };
    case 'add_courses':
      return { ...state, courses: action.courses };
    case 'add_assignments':
      return { ...state, assignments: action.assignments, lastUpdate: action.time };
    case 'update_assignments':
      return {
        ...state,
        assignments: [
          ...state.assignments || [],
          ...action.assignments,
        ].reduce((array, assignment) => {
          if (array.findIndex((value) => value.id === assignment.id) === -1) array.push(assignment);
          return array;
        }, [] as Assignment[]),
        lastUpdate: action.time,
      };
    case 'done_assignment':
      return {
        ...state,
        assignments: state.assignments!.map((assignment) => {
          if (assignment.id === action.id) {
            return {
              ...assignment,
              done: true,
            };
          }

          return assignment;
        }),
      };
    default:
      return state;
  }
}
