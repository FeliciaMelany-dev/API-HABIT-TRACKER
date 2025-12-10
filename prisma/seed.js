import prisma from "../src/config/prisma.js"
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

  const passWord = await bcrypt.hash("123456", 10);

  const usersData = [
    { name: "Felicia", email: "felicia@example.com" },
    { name: "Yasmim", email: "yasmim@example.com" },
    { name: "João Pedro", email: "joao@example.com" },
    { name: "Maria Clara", email: "maria@example.com" },
    { name: "Lucas Henrique", email: "lucas@example.com" },
    { name: "Ana Vitória", email: "ana@example.com" },
    { name: "Rafael Luiz", email: "rafael@example.com" },
    { name: "Beatriz Lima", email: "beatriz@example.com" },
    { name: "Carlos Eduardo", email: "cadu@example.com" },
    { name: "Juliana Torres", email: "juliana@example.com" },
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
        ...userData,
        passWord,
        habits: {
          create: habitsTemplates
            .sort(() => Math.random() - 0.5) // embaralha hábitos
            .slice(0, Math.floor(Math.random() * 3) + 2) // 2 a 4 hábitos por user
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
    console.error(" Erro no seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
