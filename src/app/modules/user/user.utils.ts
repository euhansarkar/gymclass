import prisma from '../../../shared/prisma';


// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      role: 'ADMIN',
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
