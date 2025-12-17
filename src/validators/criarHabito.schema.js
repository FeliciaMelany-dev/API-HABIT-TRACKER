import z from "zod";

export const criaHabito = z.object({
  body: z.object({
    title: z.preprocess(
      val => (val === undefined ? "" : val),
      z.string().min(1, "Título do hábito é obrigatório")
    ),
    description: z.preprocess(
      val => (val === undefined ? "" : val),
      z.string().min(1, "Descrição do hábito é obrigatório")
    ),
    horario: z.string().optional(),
    descricao: z.string().optional()
  })
});
