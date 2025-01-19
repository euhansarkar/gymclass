import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../app/prismaMiddlwares/hash';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

// prisma.$use(encryptPassword);

export default prisma;
