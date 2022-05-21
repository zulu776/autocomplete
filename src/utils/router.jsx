import React from 'react';
import { Route } from 'react-router-dom';

import { Search } from '../components/Search';

export const BaseRouter = () => {
  return (
    <>
      <Route exact path="/" component={Search} />
    </>
  );
};
