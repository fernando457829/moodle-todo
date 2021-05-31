import { useCallback, useReducer } from 'react';
import { useLocalStorage } from 'react-use';

import reducer, { DataReducer, State } from '../reducers/data';

export default function createDataReducer() {
  const [data, saveData] = useLocalStorage<State>('data');

  const persistReducer = useCallback<DataReducer>((state, action) => {
    const newState = reducer(state, action);

    saveData(newState);

    return newState;
  }, []);

  return useReducer<DataReducer>(persistReducer, data ?? {});
}
