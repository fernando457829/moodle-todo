import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Entrypoint() {
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');

    history.push(user ? '/home' : '/login');
  }, []);

  return <div />;
}
