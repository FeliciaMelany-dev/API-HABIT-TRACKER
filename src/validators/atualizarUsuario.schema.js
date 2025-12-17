
import z from "zod";

export const atualizarUsuarioSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Nome não pode ser vazio")
      .optional(),

    email: z
      .string()
      .email("Email inválido")
      .optional(),

    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .optional()
  }).refine(
    data => Object.keys(data).length > 0,
    { message: "Informe ao menos um campo para atualizar" }
  )
});