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
import { Formik, Field, Form } from "formik";
import { useParams, useRouter } from "next/navigation";

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

export default function FormularioUsuario() {
  const router = useRouter();
  const { id } = useParams(); // Usado para obter o ID da URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginScreen"); // Se já estiver logado, redireciona para o Dashboard
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      api
        .get(`/api/cadastros/${id}`) // Mudado para "/api/cadastros" ao invés de "/api/cadastro-pessoa-fisicas"
        .then((response) => {
          setUsuario(response.data); // Atualize o estado com a resposta
        })
        .catch((error) => console.error("Erro ao carregar usuário:", error));
    }
  }, [id]);

  const initialValues = {
    tipo: usuario?.tipo || "",
    nome: usuario?.nome || "",
    cpf: usuario?.cpf || "",
    rg: usuario?.rg || "",
    razaoSocial: usuario?.razaoSocial || "", // Para Pessoa Jurídica
    cnpj: usuario?.cnpj || "",
    inscricaoEstadual: usuario?.inscricaoEstadual || "",
    cep: usuario?.cep || "",
    cidade: usuario?.cidade || "",
    uf: usuario?.uf || "",
    logradouro: usuario?.logradouro || "",
    numero: usuario?.numero || "",
    bairro: usuario?.bairro || "",
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = {
        tipo: values.tipo,
        uf: values.uf,
        cidade: values.cidade,
        cep: values.cep,
        logradouro: values.logradouro,
        numero: values.numero,
        bairro: values.bairro,
        nome,
        cpf,
        rg,
        razaoSocial,
        cnpj,
        inscricaoEstadual,
      };

      // Verifique se o tipo é PF ou PJ e envie os dados corretos
      if (values.tipo === "PF") {
        data.nome = values.nome;
        data.cpf = values.cpf;
        data.rg = values.rg;
      } else if (values.tipo === "PJ") {
        data.razaoSocial = values.razaoSocial;
        data.cnpj = values.cnpj;
        data.inscricaoEstadual = values.inscricaoEstadual;
      }
      console.log(values);

      if (id > 0) {
        // Se o ID existe, é uma edição
        await api.put(`/api/cadastros/${id}`, {
          data: {
            uf: values.uf,
            cidade: values.cidade,
            cep: values.cep,
            logradouro: values.logradouro,
            numero: values.numero,
            bairro: values.bairro,
            nome: values.nome,
            cpf: values.cpf,
            rg: values.rg,
            tipo: values.tipo,
            razaoSocial: values.razaoSocial,
            cnpj: values.cnpj,
            inscricaoEstadual: values.inscricaoEstadual,
          },
        });
      } else {
        // Caso contrário, é uma criação
        await api.post("/api/cadastros", {
          data: {
            uf: values.uf,
            cidade: values.cidade,
            cep: values.cep,
            logradouro: values.logradouro,
            numero: values.numero,
            bairro: values.bairro,
            nome: values.nome,
            cpf: values.cpf,
            rg: values.rg,
            tipo: values.tipo,
            razaoSocial: values.razaoSocial,
            cnpj: values.cnpj,
            inscricaoEstadual: values.inscricaoEstadual,
          },
        });
      }

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
        <Title>{id ? "Editar Usuario" : "Criar Usuario"}</Title>{" "}
        {/* Condicional no título */}
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
                onSubmit={() => handleSubmit()}
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
