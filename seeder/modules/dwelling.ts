import prisma from "../../src/shared/prisma";

async function seedDwelling(id: string, dwellings: string[]) {


    // Dwelling creation 
    await Promise.all(dwellings?.map(async dwelling => {



        const dwellingCreation = await prisma.dwelling.create({
            data: {
                name: dwelling,
                categoryId: id
            }
        })

        //!  Dwelling console
        console.log(dwellingCreation);


    }))

}

export const DwellingSeeder = { seedDwelling }