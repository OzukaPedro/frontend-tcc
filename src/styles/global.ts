import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  //background-color: #f7f7f7;
  //border-radius: 8px;
  //box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const AppCard = styled.div<{ isExpanded }>`
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1.3rem;
  padding: 1rem;
  background: #f9f9f9;
  transition: all 0.3s ease-in-out;
  border: 1px solid #cacaca2b;
  
  &&:hover {
    transform: scale(1.05);
  }
  
  ${({ isExpanded }) => isExpanded && `
    transform: scale(1.05);
  `}
`;