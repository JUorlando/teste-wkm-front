"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { pessoaSchema } from "../../schemas/schemas";
import { ICidade, IEstado, ApiError } from "../../interface/interfaces";
import "../../styles/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

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

        const apiError = error as { response?: { data?: ApiError } };

        if (apiError.response?.data?.error) {
          const validationErrors = apiError.response.data.error.details.errors;

          const emailError = validationErrors.find((err) =>
            err.path.includes("email")
          );
          if (emailError) {
            setErrors((prev) => ({
              ...prev,
              email: "Esse email já existe. Tente outro.",
            }));
          } else {
            setErrors({
              submit: "Erro ao cadastrar a pessoa. Tente novamente.",
            });
          }
        } else {
          setErrors({ submit: "Erro ao cadastrar a pessoa. Tente novamente." });
        }
      }
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="label">
          Nome
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon
              icon={faUser}
              className="w-4 h-4 text-green-500 dark:text-green-400 flex justify-center items-center"
            />
          </div>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu Nome"
            required
            className="input"
          />
        </div>
          {errors.nome && (
            <span className="span">
              <span className="font-medium"></span> {errors.nome}
            </span>
          )}
      </div>

      <div className="mb-5">
        <label className="label">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-4 h-4 text-green-500 dark:text-green-400 flex justify-center items-center"
            />
          </div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@gmail.com"
            required
            className="input"
          />
        </div>
          {errors.email && (
            <span className="span">
              <span className="font-medium"></span> {errors.email}
            </span>
          )}
      </div>

      <div className="mb-5">
        <label className="label">
          Estado
        </label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleEstadoChange}
          required
          className="select"
        >
          <option value="">Selecione seu estado</option>
          {estados.map((estado) => (
            <option key={estado.documentId} value={estado.documentId}>
              {estado.nome}
            </option>
          ))}
        </select>
        {errors.estado && (
          <span className="span">
            <span className="font-medium"></span> {errors.estado}
          </span>
        )}
      </div>

      <div className="mb-5">
        <label className="label">
          Cidade
        </label>
        <select
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="">Selecione sua cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
        {errors.cidade && (
          <span className="span">
            <span className="font-medium"></span> {errors.cidade}
          </span>
        )}
      </div>

      <button className="btn" type="submit">
        Cadastrar
      </button>
    </form>
  );
};

export default PessoaAdd;
