
import z from "zod";

export const completarHabitoSchema = z.object({
  params: z.object({
    id: z.preprocess(
      val => (val === undefined ? "" : val),
      z.string().min(1, "ID do hábito é obrigatório")
    )
  })
});