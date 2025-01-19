import prisma from "../../src/shared/prisma";

async function seedTimeframe() {

    const timeframes = [`monthly`, `weekly`, `daily`, `hourly`];


    // Timeframe creation 
    await Promise.all(timeframes?.map(async timeframe => {



        const timeframeCreation = await prisma.timeframe.create({
            data: {
                name: timeframe,

            }
        })

        //!  Timeframe console
        console.log(timeframeCreation);


    }))

}

export const TimeframeSeeder = { seedTimeframe }