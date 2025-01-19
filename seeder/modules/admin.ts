import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function seedAdmin() {

    const adminCount = 1;

    for (let i = 0; i < adminCount; i++) {

        const admin = await prisma.admin.create({
            data: {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                gender: faker.person.sexType(),
                email: faker.internet.email(),
                emergencyContactNo: faker.phone.number(),
                profileImage: faker.image.avatar(),
            }
        })

        const user = await prisma.user.create({
            data: {
                contactNo: "01612593250",
                password: "123456",
                role: "admin",
                id: faker.string.uuid(),
                adminId: admin.uid,
                isActive: faker.datatype.boolean(),
            }
        })

        //! user console.log

        console.log(user);

        const users = await prisma.user.findMany();
        console.log(users);
    }

}

export const AdminSeeder = { seedAdmin };