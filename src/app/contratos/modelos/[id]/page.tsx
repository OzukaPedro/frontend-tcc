'use client';

import React, { useEffect, useState, } from 'react';
import { useParams, useRouter } from "next/navigation";
import { Formik, Field, Form, FieldArray } from 'formik';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import api from "../../../../utils/api";

const Container = styled.div`
`;

const Formulario = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
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

const BtnCls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 40px;
`;

export default function ContractModelForm() {
  const router = useRouter();
  const { id } = useParams();
  
  const [initialValues, setInitialValues] = useState({
    nomeModelo: '',
    prologo: `No pacote está incluso a viagem terrestre com ônibus Leito/turismo, serviço de bordo, acompanhamento de Guia de Turismo credenciado pela EMBRATUR, 1 hospedagens no Hotel Pietro Ângelo, com direito a dois cafés da manhã, transporte para os atrativos, Cataratas do Iguaçu, Parque da Aves, e Itaipú Binacional. As entradas nestes atrativos assim como despesas individuais ficam a cargo dos passageiros. Está incluso no pacote, o transporte para Argentina e Paraguai com visitas na Itaipu no lado paraguaio e na Argentina, visita a Feirinha e Marco das Três Fronteiras.`,
    clausulas: [
      `O CONTRATANTE se responsabilizará por todos os danos e prejuízos causados pelo mesmo, no ônibus ou hotéis durante o período da viagem e da hospedagem.
Cláusula Penal - Em caso de força maior a ensejadora do cancelamento deste contrato, por qualquer uma das partes, ficará sujeito ao pagamento da cláusula penal no valor de 20% (vinte por cento) sobre o valor total do contrato.
`,
`Os valores pagos a título de antecipação ao CONTRATADO não serão devolvidos em caso de desistência do CONTRATANTE ou cancelamento da viagem sem justificativa legal. Se a desistência partir do Contratado, ficará obrigado a restituir o valor pago antecipadamente.`,
`Em caso de força maior ou  que implique no atraso do pagamento das parcelas   por parte do CONTRATANTE, este terá o direito de renegociar as datas para pagamento destas parcelas junto ao CONTRATADO, Sendo que assim fica claro, que a última parcela do contrato, deve ser quitado até o dia da saída da viagem. Ou como combinado com o contratado.`,
`A permanência no hotel após a data de vencimento, sem comum acordo, implicará no pagamento do aluguel/diária, por dia que exceder até a efetiva desocupação. Os passeios terão horários previamente agendados e avisados, o não comparecimento no horário estipulado classifica como falta de interesse do contratante, abdicando assim daquele passeio.`
    ],
    paragrafoUnico: `Em casos supervenientes que determinem a antecipação do retorno da viagem por parte do CONTRATANTE, não serão devolvidos os valores. O contratante fica ciente que os passeios dependem diretamente das condições do clima podendo ser alterados caso haja necessidade ocasionada por problemas como chuvas fortes ou condições que impeçam os passeios programados. Podendo ser mudados caso haja necessidade.
O roteiro poderá ser alterado, por motivo de força maior ou caso fortuito.
FORO: As partes comprometem-se a cumprir este contrato fielmente em todas as suas cláusulas e condições, e assumem o presente por si, elegem de comum acordo o Foro da Comarca de Cianorte – PR, para dirimir quaisquer dúvidas referentes a este contrato.
 E por estarem assim justos e contratados, assinam o presente em duas vias de igual teor e forma, para que produza seus efeitos legais. 
`,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== 'novo') {
      setLoading(true);
      api
        .get(`/api/modelos/${id}`)
        .then((response) => {
          setInitialValues(response.data.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar os dados do modelo:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id && id !== 'novo') {
        await api.put(`/api/modelos/${id}`, {
          data: values
        });
        alert('Modelo atualizado com sucesso!');
      } else {
        await api.post('/api/modelos', {
          data: values
        });
        alert('Modelo criado com sucesso!');
      }
      router.push('/contratos/modelos');
    } catch (error) {
      console.error('Erro ao salvar o modelo:', error);
      alert('Erro ao salvar o modelo. Tente novamente.');
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container>
      <Formulario>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => (
            <Form>
              <FormContainer>
                <Typography variant="h5">
                  {id === 'novo' ? 'Cadastrar Modelo de Contrato' : 'Editar Modelo de Contrato'}
                </Typography>

                <Field
                  as={TextField}
                  name="nomeModelo"
                  label="Nome do Modelo"
                  fullWidth
                  error={!!errors.modelName}
                  helperText={errors.modelName}
                />

                <Field
                  as={TextField}
                  name="prologo"
                  label="Prólogo"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.prologue}
                  helperText={errors.prologue}
                />

                <Typography variant="h6">Cláusulas</Typography>
                <FieldArray
                  name="clausulas"
                  render={(arrayHelpers) => (
                    <>
                      {values.clausulas.map((clause, index) => (
                        <ClauseContainer key={index}>
                          <TextField
                            name={`clauses.${index}`}
                            label={`Cláusula ${index + 1}`}
                            value={clause}
                            onChange={(e) => arrayHelpers.replace(index, e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                            error={!!errors.clauses}
                          />
                          <Actions>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={values.clausulas.length === 1}
                            >
                              Remover
                            </Button>
                          </Actions>
                        </ClauseContainer>
                      ))}
                      <BtnCls>
                        <Button variant="contained" onClick={() => arrayHelpers.push('')}>
                          Adicionar Cláusula
                        </Button>
                      </BtnCls>
                    </>
                  )}
                />

                <Field
                  as={TextField}
                  name="paragrafoUnico"
                  label="Parágrafo Único"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.uniqueParagraph}
                  helperText={errors.uniqueParagraph}
                />

                <Actions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "1rem" }}
                  >
                    Salvar
                  </Button>
                </Actions>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Formulario>
    </Container>
  );
}
