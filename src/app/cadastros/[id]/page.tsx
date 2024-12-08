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
import { useRouter } from "next/navigation";

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
  const id = params;
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
  const [complemento, setComplemento] = useState("");

  useEffect(() => {
    if (id) {
      api
        .get(`/api/cadastro-pessoa-fisicas/${id}`)
        .then((response) => {
          setUsuario(response.data.documentId);
        })
        .catch((error) => console.error("Erro ao carregar usuário:", error));
    }
  }, [id]);

  const initialValues = {
    tipo: usuario ? usuario.tipo : "",
    nome: usuario ? usuario.nome : "",
    cpf: usuario ? usuario.cpf : "",
    rg: usuario ? usuario.rg : "",
    razaoSocial: usuario ? usuario.razaoSocial : "",
    cnpj: usuario ? usuario.cnpj : "",
    inscricaoEstadual: usuario ? usuario.inscricaoEstadual : "",
    cep: usuario ? usuario.cep : "",
    cidade: usuario ? usuario.cidade : "",
    uf: usuario ? usuario.uf : "",
    endereco: usuario ? usuario.endereco : "",
    numero: usuario ? usuario.numero : "",
    bairro: usuario ? usuario.bairro : "",
    complemento: usuario ? usuario.complemento : "",
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Dados comuns para Cadastro (Pessoal ou Jurídico)

      // Criação do Cadastro (Cadastro será criado primeiro)
      const cadastroResponse = await api.post(
        "/api/cadastros",
        {
          data: {
            tipo: tipo,
            uf: uf,
            cidade: cidade,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const cadastroId = cadastroResponse.data.data.id;
      if (cadastroResponse.data.data.tipo === "PF") {
        await api.post("/api/cadastro-pessoa-fisicas", {
          data: {
            nome: nome,
            cpf: cpf,
            rg: rg,
            cadastro: cadastroId, // Vincula o cadastro criado
          },
        });
      } else if (cadastroResponse.data.data.tipo === "PJ") {
        await api.post("/api/cadastro-pessoa-juridicas", {
          data: {
            razaoSocial: razaoSocial,
            cnpj: cnpj,
            inscricaoEstadual: inscricaoEstadual,
            cadastro: cadastroId, // Vincula o cadastro criado
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
        <Title>{id ? "Editar Usuario " : "Criar Novo Usuário"}</Title>
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
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <MenuItem value="PF">Pessoa Física</MenuItem>
                  <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                </Field>
              </FormControl>

              {tipo === "PF" && (
                <>
                  <Field
                    name="nome"
                    label="Nome"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <Field
                    name="cpf"
                    label="CPF"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 11 }}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  <Field
                    name="rg"
                    label="RG"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 11 }}
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </>
              )}

              {tipo === "PJ" && (
                <>
                  <Field
                    name="razaoSocial"
                    label="Razão Social"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={razaoSocial}
                    onChange={(e) => setRazaoSocial(e.target.value)}
                  />
                  <Field
                    name="cnpj"
                    label="CNPJ"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 14 }}
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                  <Field
                    name="inscricaoEstadual"
                    label="Inscrição Estadual"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    value={inscricaoEstadual}
                    onChange={(e) => setInscricaoEstadual(e.target.value)}
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
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <Field
                name="cidade"
                label="Cidade"
                component={TextField}
                fullWidth
                margin="normal"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <Field
                name="uf"
                label="UF"
                component={TextField}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 2 }}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
              <Field
                name="logradouro"
                label="Logradouro"
                component={TextField}
                fullWidth
                margin="normal"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
              />
              <Field
                name="numero"
                label="Número"
                component={TextField}
                fullWidth
                margin="normal"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <Field
                name="bairro"
                label="Bairro"
                component={TextField}
                fullWidth
                margin="normal"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ marginTop: "1rem" }}
                onClick={handleSubmit}
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
