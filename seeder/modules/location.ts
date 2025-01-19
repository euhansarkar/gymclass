import data from '../../data/data.json';
import prisma from '../../src/shared/prisma';
async function seedLocation() {

    type Division = {
        name: string;
        bnName: string;
        districts: District[];
    }

    type District = {
        name: string;
        bnName: string;
        thanas: Thana[];
    }

    type Thana = {
        name: string;
        bnName: string;
        areas: Area[];
    }

    type Area = {
        name: string;
        bnName: string;
    }


    const locations: Division[] = JSON.parse(JSON.stringify(data));


    for (let i = 0; i < locations?.length; i++) {

        const location = locations[i];
        const districts: District[] = location?.districts;

        const divitionCreation = await prisma.division.create({
            data: {
                name: location?.name.toLocaleLowerCase(),
            }
        })



        for (let j = 0; j < districts.length; j++) {
            const district = districts[j];
            const thanas: Thana[] = district.thanas;

            const districtCreation = await prisma.district.create({
                data: {
                    name: district?.name.toLocaleLowerCase(),
                    divisionId: divitionCreation?.id
                }
            })

            for (let k = 0; k < thanas.length; k++) {
                const thana = thanas[k];
                const areas: Area[] = thana?.areas;

                const thanaCreation = await prisma.thana.create({
                    data: {
                        name: thana?.name.toLocaleLowerCase(),
                        districtId: districtCreation?.id
                    }
                })

                for (let l = 0; l < areas.length; l++) {
                    const area = areas[l];
                    const areaCreation = await prisma.area.create({
                        data: {
                            name: area?.name.toLocaleLowerCase(),
                            thanaId: thanaCreation?.id
                        }
                    })


                    //! console area
                    console.log(areaCreation);
                }
            }
        }


    }

}

export const LocationSeeder = { seedLocation }