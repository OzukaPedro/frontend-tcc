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
import { useRouter, useParams } from "next/navigation";
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
  const { id } = useParams();
  
  const [initialValues, setInitialValues] = useState({
    nome: "",
    valor: 0,
    tipo: "viagem",
    ufOrigem: "",
    cidadeOrigem: "",
    ufDestino: "",
    cidadeDestino: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginScreen");
    }
  }, [router]);

  useEffect(() => {
    if (id && id !== "novo") {
      api
        .get(`/api/viagens/${id}`)
        .then((response) => {
          setInitialValues({tipo: "viagem", ...response.data.data});
        })
        .catch((error) => console.error("Erro ao carregar viagem:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (id && id !== "novo") {
        await api.put(`/api/viagens/${id}`, {
          data: values
        });
      } else {
        await api.post("/api/viagens", {
          data: values
        });
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
      <Title>{id && id !== "novo" ? "Editar Viagem" : "Criar Nova Viagem"}</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Field
              name="nome"
              label="Nome"
              as={TextField}
              fullWidth
              margin="normal"
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              name="valor"
              label="Valor Total"
              as={TextField}
              fullWidth
              margin="normal"
              type="number"
              value={values.valor}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Field
                as={Select}
                name="tipo"
                value={values.tipo}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="viagem">Viagem</MenuItem>
              </Field>
            </FormControl>

            {values.tipo === "viagem" && (
              <>
                <Field
                  name="cidadeOrigem"
                  label="Cidade de Origem"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  value={values.cidadeOrigem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="ufOrigem"
                  label="UF de Origem"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  value={values.ufOrigem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="cidadeDestino"
                  label="Cidade de Destino"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  value={values.cidadeDestino}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="ufDestino"
                  label="UF de Destino"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  value={values.ufDestino}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
