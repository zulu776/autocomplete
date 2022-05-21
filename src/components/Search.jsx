import React, { useState } from 'react';
import styled from 'styled-components';

import { SearchBar } from './SearchBar';
import userList from '../assets/users';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #494a9d;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  letter-spacing: 0.3px;
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
`;

export function Search() {
  const [words] = useState(userList);

  return (
    <Style>
      <div>
        {/* Search bar */}
        <Title>
          Busca el usuario
          <br />
        </Title>
        <SearchBar words={words} />
      </div>
    </Style>
  );
}
