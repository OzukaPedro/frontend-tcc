"use client";

import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import styled from "styled-components";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik, Field, Form } from "formik";

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

export default function FormularioViagem({ params }) {
  const router = useRouter();
  const { id } = params;
  const [viagem, setViagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api
        .get(`/api/viagens/${id}`)
        .then((response) => {
          setViagem(response.data);
        })
        .catch((error) => console.error("Erro ao carregar viagem:", error));
    }
  }, [id]);

  const initialValues = {
    nome: viagem ? viagem.nome : "",
    valorTotal: viagem ? viagem.valorTotal : "",
    tipo: viagem ? viagem.tipo : "viagem",
    cidadeOrigem: viagem ? viagem.cidadeOrigem : "",
    ufOrigem: viagem ? viagem.ufOrigem : "",
    cidadeDestino: viagem ? viagem.cidadeDestino : "",
    ufDestino: viagem ? viagem.ufDestino : "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/api/viagens/${id}`, values);
      } else {
        await api.post("/api/viagens", values);
      }
      router.push("/viagens");
    } catch (error) {
      console.error("Erro ao salvar viagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Formulario>
        <Title>{id ? "Editar Viagem" : "Criar Nova Viagem"}</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <Field
                name="nome"
                label="Nome"
                component={TextField}
                fullWidth
                margin="normal"
              />
              <Field
                name="valorTotal"
                label="Valor Total"
                component={TextField}
                fullWidth
                margin="normal"
                type="number"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo</InputLabel>
                <Field as={Select} name="tipo" label="Tipo" value={values.tipo}>
                  <MenuItem value="viagem">Viagem</MenuItem>
                </Field>
              </FormControl>

              {values.tipo === "viagem" && (
                <>
                  <Field
                    name="cidadeOrigem"
                    label="Cidade de Origem"
                    component={TextField}
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    name="ufOrigem"
                    label="UF de Origem"
                    component={TextField}
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    name="cidadeDestino"
                    label="Cidade de Destino"
                    component={TextField}
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    name="ufDestino"
                    label="UF de Destino"
                    component={TextField}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ marginTop: "1rem" }}
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </Form>
          )}
        </Formik>
      </Formulario>
    </Container>
  );
}
