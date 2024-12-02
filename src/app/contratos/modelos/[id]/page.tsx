'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 2rem auto;
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const ClauseContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Actions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default function ContractModelForm() {
  const [clauses, setClauses] = useState([{ id: Date.now(), text: '' }]);

  const handleAddClause = () => {
    setClauses([...clauses, { id: Date.now(), text: '' }]);
  };

  const handleRemoveClause = (id) => {
    setClauses(clauses.filter((clause) => clause.id !== id));
  };

  const handleChangeClause = (id, text) => {
    setClauses(
      clauses.map((clause) => (clause.id === id ? { ...clause, text } : clause))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = {
      modelName: data.get('modelName'),
      prologue: data.get('prologue'),
      clauses: clauses.map((clause) => clause.text),
      uniqueParagraph: data.get('uniqueParagraph'),
    };
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h5">Cadastrar Modelo de Contrato</Typography>

      <TextField name="modelName" label="Nome do Modelo" required fullWidth />
      <TextField
        name="prologue"
        label="Prólogo"
        required
        multiline
        rows={4}
        fullWidth
      />

      <Typography variant="h6">Cláusulas</Typography>
      {clauses.map((clause, index) => (
        <ClauseContainer key={clause.id}>
          <TextField
            label={`Cláusula ${index + 1}`}
            multiline
            rows={3}
            value={clause.text}
            onChange={(e) => handleChangeClause(clause.id, e.target.value)}
            fullWidth
          />
          <Actions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveClause(clause.id)}
            >
              Remover
            </Button>
          </Actions>
        </ClauseContainer>
      ))}

      <Button variant="contained" onClick={handleAddClause}>
        Adicionar Cláusula
      </Button>

      <TextField
        name="uniqueParagraph"
        label="Parágrafo Único"
        multiline
        rows={4}
        fullWidth
      />

      <Actions>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Actions>
    </FormContainer>
  );
}
