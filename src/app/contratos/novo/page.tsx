'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import api from "../../../utils/api";
import { useRouter } from "next/navigation";

const FormContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContractForm = () => {
  const router = useRouter();
  const [modelos, setModelos] = useState([]);
  const [contratantes, setContratantes] = useState([]);
  const [viagens, setViagens] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    try {
      api.get('/api/modelos').then((res) => setModelos(res.data.data));
      api.get('/api/cadastros').then((res) => setContratantes(res.data.data));
      api.get('/api/viagens').then((res) => setViagens(res.data.data));
      
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  }
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      Object.keys(values).forEach(key => {
        if (values[key] === '' || values[key] === null) {
          delete values[key];
        }
      });
      const response = await api.post('/api/contratos', {
        data: values
      });
      resetForm();
      router.push('/contratos');
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
          modelos: null,
          descricao: '',
          contratantes: null,
          contratados: null,
          viagems: null,
          dataInicio: '',
          dataFinal: '',
          dataEmissao: '2024-12-08',
          dataValidade: '2024-12-08',
          valor: '',
          parcelado: false,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Field
              component={TextField}
              name="modelos"
              label="Modelo"
              select
              fullWidth
              margin="normal"
            >
              {modelos.map((modelo) => (
                <MenuItem key={modelo.id} value={modelo.id}>
                  {modelo.nomeModelo}
                </MenuItem>
              ))}
            </Field>

            <Field
              component={TextField}
              name="descricao"
              label="Descrição"
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="contratantes"
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
              name="contratados"
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
              name="viagems"
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
              name="dataInicio"
              label="Data Início"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="dataFinal"
              label="Data Fim"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Field
              component={TextField}
              name="valor"
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
