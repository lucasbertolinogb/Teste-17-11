import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Lucas',
      email: 'lucasteste@gmail.com'
    },
  })

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Prisma Certo',
      email: 'prismacerto@teste.com',
    },
  });

  const leilao = await prisma.leilao.create({
    data: {
      produto: 'Sofa Novo',
      datalimite: new Date(),
      donoId: usuario1.id,
    },
  });

  const lance1 = await prisma.lance.create({
    data: {
      valor: 100.0,
      compradorId: usuario2.id,
      leilaoId: leilao.id,
    },
  });

  const lance2 = await prisma.lance.create({
    data: {
      valor: 150.0,
      compradorId: usuario1.id,
      leilaoId: leilao.id,
    },
  });
  console.log('Dados criados com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })