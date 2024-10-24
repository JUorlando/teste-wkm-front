"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { pessoaSchema } from "../../schemas/schemas";
import { ICidade, IEstado } from "../../interface/interfaces";

const PessoaAdd = () => {
  const [cidades, setCidades] = useState<ICidade[]>([]);
  const [estados, setEstados] = useState<IEstado[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    estado: "",
    cidade: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/estados`
        );
        setEstados(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };
    fetchEstados();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEstadoChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const estadoId = event.target.value;
    setFormData({ ...formData, estado: estadoId, cidade: "" });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/estados/${estadoId}`
      );

      const estado = response.data;

      setCidades(estado.cidades || []);
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
      setCidades([]);
    }
  };

  const validateForm = () => {
    const result = pessoaSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
      return errors;
    }
    return {};
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/pessoas`,
          {
            data: {
              nome: formData.nome,
              email: formData.email,
              cidade: formData.cidade,
              estado: formData.estado,
            },
          }
        );

        const documentId = response.data.data.documentId;
        window.location.href = `/pessoa/${documentId}`;
      } catch (error) {
        console.error("Erro ao enviar o formulário", error);
        setErrors({ submit: "Erro ao cadastrar a pessoa. Tente novamente." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        {errors.nome && <span>{errors.nome}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="digite seu email"
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleEstadoChange}
          required
        >
          <option value="">Selecione seu estado</option>
          {estados.map((estado) => (
            <option key={estado.documentId} value={estado.documentId}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && <span>{errors.estado}</span>}{" "}
      </div>

      <div>
        <label>Cidade</label>
        <select
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
        >
          <option value="">Selecione sua cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && <span>{errors.cidade}</span>}{" "}
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default PessoaAdd;
