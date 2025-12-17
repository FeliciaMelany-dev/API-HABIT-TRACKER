import z from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z
        .string()
        .optional()
        .refine(val => val && val.trim().length > 0, {
            message: "Nome é obrigatório"
        }),

        email: z
        .string()
        .optional()
        .refine( val => val && val.trim(). length > 0, {
            message: "Email é obrigatório"
        }),

        password: z
        .string()
        .optional()
        .refine(val => val && val.length >=6, {
            message: "Senha deve ter no mínimo 6 caracteres"
        })
    })
})