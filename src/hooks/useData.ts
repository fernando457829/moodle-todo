import { useContext } from 'react';

import DataContext from '../contexts/DataContext';

export default function useData() {
  const { state, dispatch } = useContext(DataContext);

  return { ...state, dispatch };
}
