import { Reducer, useCallback, useReducer } from 'react';

export default function useToggleValue<T>(
  trueValue: T,
  falseValue: T,
  initialValue?: boolean,
): [T, (nextValue?: boolean) => void] {
  const toggleReducer = useCallback(
    (state: T, nextValue?: boolean) => {
      if (typeof nextValue === 'boolean') return nextValue ? trueValue : falseValue;

      return state === trueValue ? falseValue : trueValue;
    },
    [trueValue, falseValue],
  );

  return useReducer<Reducer<T, any>>(toggleReducer, initialValue ? trueValue : falseValue);
}
