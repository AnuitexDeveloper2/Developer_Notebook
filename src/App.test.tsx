import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';
import LogIn from "./Pages/signIn/LogIn";
import TopicPage from './Pages/topic';
import ErrorModal from './components/common/Error';

test('renders learn react link', () => {
  render(<ErrorModal error={false}/>);
  screen.debug();
});
