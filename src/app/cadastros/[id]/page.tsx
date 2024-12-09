"use client";

import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useParams, useRouter } from "next/navigation";
import { Container, Formulario, Title } from "./styles";

export default function FormularioUsuario() {
  const router = useRouter();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    tipo: "",
    nome: "",
    cpf: "",
    rg: "",
    razaoSocial: "",
    cnpj: "",
    inscricaoEstadual: "",
    cep: "",
    cidade: "",
    uf: "",
    logradouro: "",
    numero: "",
    bairro: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(Boolean(id));

  useEffect(() => {
    if (id && Number(id) >= 0) {
      api
        .get(`/api/cadastros/${id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((error) => console.error("Erro ao carregar usuário:", error));
    }
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const url = Number(id) >= 0 ? `/api/cadastros/${id}` : "/api/cadastros";
      const method = Number(id) >= 0 ? "put" : "post";

      var payload = {
        tipo: values.tipo,
        uf: values.uf,
        cidade: values.cidade,
        cep: values.cep,
        logradouro: values.logradouro,
        numero: values.numero,
        bairro: values.bairro,
        nome: values.nome,
        cpf: values.cpf,
        rg: values.rg,
        razaoSocial: values.razaoSocial,
        cnpj: values.cnpj,
        inscricaoEstadual: values.inscricaoEstadual,
      }
      
      if (values.tipo === "PF") {
        payload.nome = values.nome;
        payload.cpf = values.cpf;
        payload.rg = values.rg;
      } else if (values.tipo === "PJ") {
        payload.razaoSocial = values.razaoSocial;
        payload.cnpj = values.cnpj;
        payload.inscricaoEstadual = values.inscricaoEstadual;
      }
      
      await api[method](url, { data: payload });
      router.push("/cadastros");
    } catch (error) {
      console.error("Erro ao salvar cadastro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Formulario>
        <Title>{Number(id) >= 0 ? "Editar Cadastro" : "Criar Cadastro"}</Title>{" "}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tipo</InputLabel>
                <Field
                  as={Select}
                  name="tipo"
                  label="Tipo"
                  fullWidth
                  value={values.tipo}
                  onChange={(e) => setFieldValue("tipo", e.target.value)}
                >
                  <MenuItem value="PF">Pessoa Física</MenuItem>
                  <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                </Field>
              </FormControl>

              {values.tipo === "PF" && (
                <>
                  <Field
                    name="nome"
                    label="Nome"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={values.nome}
                    onChange={(e) => setFieldValue("nome", e.target.value)}
                  />
                  <Field
                    name="cpf"
                    label="CPF"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 11 }}
                    value={values.cpf}
                    onChange={(e) => setFieldValue("cpf", e.target.value)}
                  />
                  <Field
                    name="rg"
                    label="RG"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 11 }}
                    value={values.rg}
                    onChange={(e) => setFieldValue("rg", e.target.value)}
                  />
                </>
              )}

              {values.tipo === "PJ" && (
                <>
                  <Field
                    name="razaoSocial"
                    label="Razão Social"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={values.razaoSocial}
                    onChange={(e) =>
                      setFieldValue("razaoSocial", e.target.value)
                    }
                  />
                  <Field
                    name="cnpj"
                    label="CNPJ"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 14 }}
                    value={values.cnpj}
                    onChange={(e) => setFieldValue("cnpj", e.target.value)}
                  />
                  <Field
                    name="inscricaoEstadual"
                    label="Inscrição Estadual"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={values.inscricaoEstadual}
                    onChange={(e) =>
                      setFieldValue("inscricaoEstadual", e.target.value)
                    }
                  />
                </>
              )}

              <Field
                name="cep"
                label="CEP"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 10 }}
                value={values.cep}
                onChange={(e) => setFieldValue("cep", e.target.value)}
              />
              <Field
                name="cidade"
                label="Cidade"
                component={TextField}
                fullWidth
                margin="normal"
                value={values.cidade}
                onChange={(e) => setFieldValue("cidade", e.target.value)}
              />
              <Field
                name="uf"
                label="UF"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 2 }}
                value={values.uf}
                onChange={(e) => setFieldValue("uf", e.target.value)}
              />
              <Field
                name="logradouro"
                label="Logradouro"
                component={TextField}
                fullWidth
                margin="normal"
                value={values.logradouro}
                onChange={(e) => setFieldValue("logradouro", e.target.value)}
              />
              <Field
                name="numero"
                label="Número"
                component={TextField}
                fullWidth
                margin="normal"
                value={values.numero}
                onChange={(e) => setFieldValue("numero", e.target.value)}
              />
              <Field
                name="bairro"
                label="Bairro"
                component={TextField}
                fullWidth
                margin="normal"
                value={values.bairro}
                onChange={(e) => setFieldValue("bairro", e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onSubmit={handleSubmit}
                disabled={loading}
                sx={{ marginTop: "1rem" }}
              >
                {loading
                  ? "Salvando..."
                  : id
                  ? "Salvar Alterações"
                  : "Criar Usuario"}
              </Button>
            </Form>
          )}
        </Formik>
      </Formulario>
    </Container>
  );
}
