import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
`;

export const PageContainer = styled.div`
  font-size: 14px;
  line-height: 1.5;
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 40px;
  background: #fff;  
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 45px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
  strong {
    font-weight: bold;
  }
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;

  p {
    margin: 10px 0;
  }
`;

export const Signatures = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  div {
    text-align: center;

    p {
      margin: 0 0 5px;
    }

    span {
      font-size: 12px;
    }
  }
`;