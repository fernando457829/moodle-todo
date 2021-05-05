import { createContext, Dispatch } from 'react';
import { Action, State } from '../reducers/data';

export default createContext<{ state: State, dispatch: Dispatch<Action> }>({
  state: {},
  dispatch: () => {},
});
