import prisma from "../../src/shared/prisma";
import { DwellingSeeder } from "./dwelling";

async function seedCategory() {


    const categories = [
        {
            name: `apartment`, items: [
                "Family",
                "Bachelor",
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905381/xsg4cea9xib6qzellklt.jpg"
        },
        {
            name: `house`, items: [
                "Family",
                "Bachelor",
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905381/pd57dzoogkq8cbl6b8rs.jpg"
        },
        {
            name: `unit`, items: [
                "Family",
                "Bachelor",
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905381/oqceavdzbb9mpimzai6j.jpg"
        },
        {
            name: `room`, items: [
                "Family",
                "Bachelor",
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905381/s8jqbrek6q5luq1s3pos.jpg"
        },
        {
            name: `sublet`, items: [
                "Family",
                "Bachelor",
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            "image": "https://res.cloudinary.com/df916o3vt/image/upload/v1713918606/xxbkdprmbyronyneu7d9.jpg"
        },
        {
            name: `hostel`, items: [
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905380/rybap10gqnzmsiiezp69.jpg"
        },
        {
            name: `mess`, items: [
                "Male Only",
                "Female Only",
                "Male Student",
                "Female Student",
                "Male Job Holder",
                "Female Job Holder"
            ],
            image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905380/urayyo675etp8urlv68z.jpg"
        },
        { name: `shop`, items: [], image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905380/grfq9xf998sjqj2a1yfm.jpg" },
        { name: `office`, items: [], image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905380/prryu8qp3gbbyltkdcc4.jpg" },
        { name: `garage`, items: [], image: "https://res.cloudinary.com/df916o3vt/image/upload/v1713905379/qrty8mfrt55nq8qohsio.jpg" },
        // { name: `commercial-space`, items: [] },
    ];

    // category creation 
    await Promise.all(categories?.map(async (category, i) => {



        const categoryCreation = await prisma.category.create({
            data: {
                name: category?.name,
                image: category?.image
            }
        })


        if (categoryCreation?.id) {
            const dwellings = await DwellingSeeder.seedDwelling(categoryCreation.id, category?.items);
            //!  dwellings console console 
            console.log(dwellings);
            console.log(`this is index`, i, category?.name);
        }



    }))

}

export const CategorySeeder = { seedCategory }