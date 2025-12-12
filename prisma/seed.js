import prisma from "../src/config/prisma.js";
import bcrypt from "bcryptjs";

function generatePastDates(days) {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push({ date: d });
  }
  return dates;
}

async function main() {
  console.log("Limpando banco...");
  await prisma.habitCompletion.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.user.deleteMany();

  console.log("Banco limpo.");

  const password = await bcrypt.hash("123456", 10);

  // Aqui você escolhe quem será ADMIN
  const usersData = [
    { name: "Felicia", email: "felicia@example.com", role: "ADMIN" },
    { name: "Yasmim", email: "yasmim@example.com", role: "ADMIN" },

    // Usuários normais
    { name: "João Pedro", email: "joao@example.com", role: "USER" },
    { name: "Maria Clara", email: "maria@example.com", role: "USER" },
    { name: "Lucas Henrique", email: "lucas@example.com", role: "USER" },
    { name: "Ana Vitória", email: "ana@example.com", role: "USER" },
    { name: "Rafael Luiz", email: "rafael@example.com", role: "USER" },
    { name: "Beatriz Lima", email: "beatriz@example.com", role: "USER" },
    { name: "Carlos Eduardo", email: "cadu@example.com", role: "USER" },
    { name: "Juliana Torres", email: "juliana@example.com", role: "USER" },
  ];

  const habitsTemplates = [
    {
      title: "Beber água",
      description: "2L por dia",
      completions: generatePastDates(5),
    },
    {
      title: "Estudar programação",
      description: "Ao menos 1 hora/dia",
      completions: generatePastDates(7),
    },
    {
      title: "Ir para academia",
      description: "Treino A/B",
      completions: generatePastDates(4),
    },
    {
      title: "Ler 10 páginas",
      description: "Livros de autodesenvolvimento",
      completions: generatePastDates(6),
    },
    {
      title: "Dormir cedo",
      description: "Antes das 23h",
      completions: generatePastDates(3),
    },
    {
      title: "Praticar inglês",
      description: "Assistir série em inglês",
      completions: generatePastDates(8),
    },
  ];

  console.log("Criando usuários com hábitos...");

  for (const userData of usersData) {
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        role: userData.role, // <-- agora salvando role
        password,            // <-- corrigido: deve ser o nome do seu model

        habits: {
          create: habitsTemplates
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 3) + 2)
            .map((habit) => ({
              title: habit.title,
              description: habit.description,
              completions: { create: habit.completions },
            })),
        },
      },
    });
  }

  console.log("Seed COMPLETO gerado com sucesso!");
}

main()
  .catch((err) => {
    console.error("Erro no seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });