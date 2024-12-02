import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  border-radius: 25px;
  height: 55px;
`;

const SearchInput = styled.input`
  border: none;
  padding: 10px 15px;
  flex-grow: 1;
  font-size: 16px;
  outline: none;
  background-color: white;
  border-radius: 4px;
  color: #333;
  background-color: transparent;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border: none;
  }
`;

const SearchButton = styled(IconButton)`
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  cursor: pointer;
  height: 100%;
  width: 60px;
  border-radius: 50%;
`;

function SearchBox({ busca = "", setBusca = null }) {
  const handleSearch = () => {
    console.log('Buscar:', busca);
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Buscar Cadastros"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>
    </SearchWrapper>
  );
}

export default SearchBox;
