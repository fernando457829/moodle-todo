import { createContext, Dispatch } from 'react';
import { Action, State } from '../reducers/data';

const DataContext = createContext<{ state: State, dispatch: Dispatch<Action> }>({
  state: {},
  dispatch: () => {},
});

export default DataContext;

export const DataProvider = DataContext.Provider;
