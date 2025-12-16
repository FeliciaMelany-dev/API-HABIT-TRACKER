import z from "zod"

export const atualizaHabitSchema = z.object({
  params: z.object({
    id: z.preprocess(val => (val === undefined ? "" : val), z.string().min(1, "ID do hábito é obrigatório"))
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
});
