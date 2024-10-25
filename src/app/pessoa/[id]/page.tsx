"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IReadPessoa } from "../../interface/interfaces";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faCity,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="box">
      <h1 className="title">Informações do Usuário</h1>
      <div className="text-box">
        <p className="text">
          <FontAwesomeIcon icon={faUser} className="icon" />
          Nome: {pessoa.nome}
        </p>
        <p className="text">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          Email: {pessoa.email}
        </p>
        <p className="text">
          <FontAwesomeIcon icon={faMap} className="icon" />
          Estado: {pessoa.estado.nome}
        </p>
        <p className="text">
          <FontAwesomeIcon icon={faCity} className="icon" />
          Cidade: {pessoa.cidade.nome}
        </p>
      </div>
    </div>
  );
};

export default PessoaDetalhes;
