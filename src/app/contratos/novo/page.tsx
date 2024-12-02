'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContractForm = () => {
  const [modelos, setModelos] = useState([]);
  const [contratantes, setContratantes] = useState([]);
  const [viagens, setViagens] = useState([]);

  useEffect(() => {
    axios.get('/api/modelos').then((res) => setModelos(res.data));
    axios.get('/api/contratantes').then((res) => setContratantes(res.data));
    axios.get('/api/viagens').then((res) => setViagens(res.data));
  }, []);
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/api/contratos', values);
      alert('Contrato salvo com sucesso!');
      console.log('Resposta da API:', response.data);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
      alert('Erro ao salvar o contrato. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>Novo contrato</h2>
      <Formik
        initialValues={{
          modelo: '',
          nome: '',
          contratante: '',
          viagem: '',
          dataIni: '',
          dataFim: '',
          valorTotal: '',
          parcelado: false,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Field
              component={TextField}
              name="modelo"
              label="Modelo"
              select
              fullWidth
              margin="normal"
            >
              {modelos.map((modelo) => (
                <MenuItem key={modelo.id} value={modelo.id}>
                  {modelo.nome}
                </MenuItem>
              ))}
            </Field>

            <Field
              component={TextField}
              name="nome"
              label="Nome"
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="contratante"
              label="Contratante"
              select
              fullWidth
              margin="normal"
            >
              {contratantes.map((contratante) => (
                <MenuItem key={contratante.id} value={contratante.id}>
                  {contratante.nome}
                </MenuItem>
              ))}
            </Field>
            
            <Field
              component={TextField}
              name="contratado"
              label="Contratado"
              select
              fullWidth
              margin="normal"
            >
              {contratantes.map((contratante) => (
                <MenuItem key={contratante.id} value={contratante.id}>
                  {contratante.nome}
                </MenuItem>
              ))}
            </Field>

            <Field
              component={TextField}
              name="viagem"
              label="Viagem"
              select
              fullWidth
              margin="normal"
            >
              {viagens.map((viagem) => (
                <MenuItem key={viagem.id} value={viagem.id}>
                  {viagem.nome}
                </MenuItem>
              ))}
            </Field>

            <Field
              component={TextField}
              name="dataIni"
              label="Data Início"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="dataFim"
              label="Data Fim"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="valorTotal"
              label="Valor Total"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: 'R$',
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="parcelado"
                  checked={values.parcelado}
                  onChange={handleChange}
                />
              }
              label="Parcelado"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ContractForm;
