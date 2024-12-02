'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  padding: 2rem;
`;

const Formulario = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;


export default function FormularioUsuario({ params }) {
  const router = useRouter();
  const { id } = params;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/api/usuarios/${id}`).then((response) => {
        setUsuario(response.data);
      }).catch(error => console.error("Erro ao carregar usuário:", error));
    }
  }, [id]);

  const initialValues = {
    tipo: usuario ? usuario.tipo : '',
    nome: usuario ? usuario.nome : '',
    cpf: usuario ? usuario.cpf : '',
    cep: usuario ? usuario.cep : '',
    cidade: usuario ? usuario.cidade : '',
    uf: usuario ? usuario.uf : '',
    endereco: usuario ? usuario.endereco : '',
    numero: usuario ? usuario.numero : '',
    bairro: usuario ? usuario.bairro : '',
    complemento: usuario ? usuario.complemento : '',
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await axios.put(`/api/usuarios/${id}`, values);
      } else {
        await axios.post('/api/usuarios', values);
      }
      router.push('/usuarios');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Formulario>
        <Title>{id ? 'Editar Usuário' : 'Criar Novo Usuário'}</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo</InputLabel>
                <Field
                  as={Select}
                  name="tipo"
                  label="Tipo"
                  fullWidth
                  value={values.tipo}
                >
                  <MenuItem value="PF">Pessoa Física</MenuItem>
                  <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                </Field>
              </FormControl>

              <Field
                name="nome"
                label="Nome"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Field
                name="cpf"
                label="CPF"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 11 }}
              />
              
              <Field
                name="rg"
                label="RG"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 11 }}
              />
              
              <Field
                name="phone"
                label="Telefone"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 11 }}
              />

              <Field
                name="cep"
                label="CEP"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 10 }}
              />
              
              <Field
                name="cidade"
                label="Cidade"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Field
                name="uf"
                label="UF"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 2 }}
              />

              <Field
                name="endereco"
                label="Endereço"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Field
                name="numero"
                label="Número"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Field
                name="bairro"
                label="Bairro"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Field
                name="complemento"
                label="Complemento"
                component={TextField}
                fullWidth
                margin="normal"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ marginTop: '1rem' }}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </Form>
          )}
        </Formik>
      </Formulario>
    </Container>
  );
}
