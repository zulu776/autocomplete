import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './utils/global-styles';
import { BaseRouter } from './utils/router';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </>
  );
}
