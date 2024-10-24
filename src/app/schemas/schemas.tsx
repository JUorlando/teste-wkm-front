import * as z from "zod";

const pessoaSchema = z.object({
  nome: z.string().max(250, "O nome deve ter no máximo 250 caracteres"),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),
  estado: z.string({ required_error: "Selecione um estado" }),
  cidade: z.string({ required_error: "Selecione uma cidade" }),
});

const cidadeSchema = z.object({
  id: z.string(),
  nome: z.string(),
  documentId: z.string(),
});

const estadoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  documentId: z.string(),
  cidades: z.string().array()
});

export { cidadeSchema, estadoSchema, pessoaSchema };
