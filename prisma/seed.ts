
import { generator } from '../seeder/generator';
import prisma from '../src/shared/prisma';


async function main() {

    await generator()

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