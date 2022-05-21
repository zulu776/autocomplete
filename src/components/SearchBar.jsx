import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

import { TrieTree } from '../assets/TrieTree';

const SearchContainer = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: #fff;
  form {
    width: 355px;
  }
  span {
    margin: 14px 0px 14px 14px;
    position: absolute;
  }
`;

const SearchInput = styled.input`
  color: #3d3d3d;
  font-size: 16px;
  width: -webkit-fill-available;
  margin-left: 30px;
  padding: 13px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #878787;
    font-size: 16px;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #3d3d3d;
`;

const SearchResultIcon = styled(FaChevronRight)`
  color: #3d3d3d;
  margin-right: 14px;
`;

const SearchListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0px 12px 12px 12px;
  form {
    width: 285px;
  }
  li {
    margin-top: 9px;
    a {
      color: #3d3d3d;
      display: flex;
      align-items: center;
      width: auto;
      padding: 7px;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #eaeaea;
      }
    }
  }
`;

const ListingDivider = styled.div`
  height: 2px;
  background-color: #eaeaea;
`;
// **** END SEARCH BAR STYLES ****

const handleTermSubmit = (e, search, setSearch, disableTermSubmit) => {
  //Agregar una palabra (string) en el trie tree
  e.preventDefault();

  const { searchTree, searchTerm } = search;

  if (!disableTermSubmit) {
    searchTree.insert(searchTerm);
  }
  setSearch({ searchTree, searchTerm: '' });
};

const handleTermChange = (e, searchTree, setSearch, onChange) => {
  //Cambiar el estado con cada caracter que se escriba en la barra de busqueda
  setSearch({ searchTree, searchTerm: e.target.value });

  if (onChange) {
    onChange(e.target.value);
  }
};

const handleWords = (searchTerm, setSearch, words) => {
  setSearch({
    searchTree: new TrieTree(words),
    searchTerm: searchTerm,
    searchWords: true,
  });
};

const displayResults = (searchResults) => {
  //Agregar una lista de elementos (usuarios) que hayan coincidido con la busqueda
  const resultListElement = searchResults.map((result, i) => {
    return (
      <li key={i}>
        <a href="#">
          <SearchResultIcon />
          {result}
        </a>
      </li>
    );
  });
  return resultListElement;
};

export function SearchBar(props) {
  const {
    placeholder = 'Búsqueda...',
    type = 'text',
    words = [],
    disableTermSubmit = false,
  } = props;
  //Estado 
  //Creamos un nuevo TrieTree
  //searchTerm -> el prefijo a buscar
  //searchWords -> false significa que no estamos haciendo una busqueda
  const [search, setSearch] = useState({
    searchTree: new TrieTree(),
    searchTerm: '',
    searchWords: false,
  });

  const { searchTree, searchTerm, searchWords } = search;

  if (!searchWords && words.length > 0) {
    handleWords(searchTerm, setSearch, words);
  }

  //Obtener el arreglo con todos los usuarios que coincidan con el prefijo
  const searchResults = searchTree.complete(searchTerm);

  useEffect(() => {
    document.addEventListener('keydown', (e) => e.stopPropagation(), true);

    return () => {
      document.removeEventListener('keydown', (e) => e.stopPropagation(), true);
    };
  }, []);

  return (
    <SearchContainer>
      <span>
        <SearchIcon />
      </span>
      <form
        onSubmit={(e) =>
          handleTermSubmit(e, search, setSearch, disableTermSubmit)
        }
      >
        <SearchInput
          type={type}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleTermChange(e, searchTree, setSearch)}
        />
        {searchResults.length > 0 ? (
          <>
            <ListingDivider />
            <SearchListContainer>
              {displayResults(searchResults)}
            </SearchListContainer>
          </>
        ) : null}
      </form>
    </SearchContainer>
  );
}
