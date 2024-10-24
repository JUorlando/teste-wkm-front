"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IReadPessoa } from "../../interface/interfaces";
import { useParams } from "next/navigation";



const PessoaDetalhes = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState<IReadPessoa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPessoa = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/pessoas/${id}`
          );
          setPessoa(response.data);
        } catch (error) {
          console.error("Erro ao buscar pessoa:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPessoa();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if (!pessoa) return <p>Pessoa não encontrada.</p>;

  return (
    <div>
      <h1>{pessoa.nome}</h1>
      <p>Email: {pessoa.email}</p>
      <p>Estado: {pessoa.estado.nome}</p>
      <p>Cidade: {pessoa.cidade.nome}</p>
    </div>
  );
};

export default PessoaDetalhes;

