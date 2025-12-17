import z from "zod";


export const loginSchema = z.object({
  body: z.object({
    email: z.preprocess(
      val => (val === undefined ? "" : val), 
      z.string()
        .min(1, "Email é obrigatório")
        .email("Email inválido")
    ),
    password: z.preprocess(
      val => (val === undefined ? "" : val),
      z.string().min(1, "Senha é obrigatória")
    )
  })
});
