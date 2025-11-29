// AQUI SÃO AS CONFIGURAÇÕES DO PRISMA A RESPEITO DE CAMINHOS DE ARQUIVOS E A URL DE CONEXÃO.

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
