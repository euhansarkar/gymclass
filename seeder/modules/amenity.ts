import prisma from "../../src/shared/prisma";

async function seedAmenity() {

    const amenities = [`lift`, `generator`, `security guard`, `parking`, `CCTV`, `WiFi`, `fireplace`];


    // Amenity creation 
    await Promise.all(amenities?.map(async amenity => {



        const amenityCreation = await prisma.amenity.create({
            data: {
                name: amenity,

            }
        })

        //!  Amenity console
        console.log(amenityCreation);


    }))

}

export const AmenitySeeder = { seedAmenity }