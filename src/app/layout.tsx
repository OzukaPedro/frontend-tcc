"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  margin: 140px auto;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
