import bcrypt from 'bcrypt';
import prisma from '../../shared/prisma';
// import { User } from '@prisma/client';

const prismaWithExtensions = prisma.$extends({
  model: {
    // user: {
    //   async isUserExists(contactNo: string): Promise<Partial<User> | null> {
    //     // Implement your logic to check if a user with the given ID exists.
    //     const user = await prisma.user.findUnique({ where: { contactNo } });
    //     return user;
    //   },

    //   async isPasswordMatched(
    //     givenPassword: string,
    //     savedPassword: string
    //   ): Promise<boolean> {
    //     // Implement your logic to compare passwords using bcrypt.
    //     return bcrypt.compare(givenPassword, savedPassword);
    //   },
    // },
  },
});

export default prismaWithExtensions;
