require('dotenv').config()

const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database cc18_fakebook')
  await prisma.$executeRawUnsafe('CREATE Database cc18_fakebook')
}
console.log('Reset DB..')
run()

