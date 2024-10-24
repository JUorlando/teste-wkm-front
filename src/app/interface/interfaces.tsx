import { z } from "zod";
import { cidadeSchema, estadoSchema, pessoaSchema } from "../schemas/schemas";

export type ICidade = z.infer<typeof cidadeSchema>;
export type IEstado = z.infer<typeof estadoSchema>;
export type IPessoa = z.infer<typeof pessoaSchema>;

export interface IReadPessoa {
    nome: string;
    email: string;
    estado: IEstado;
    cidade: ICidade;
  }