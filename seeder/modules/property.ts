import prisma from "../../src/shared/prisma";
import { faker } from '@faker-js/faker';
import { getImageNow } from "./dep/generateImage";
import { ImageType } from '../../src/interfaces/image';
import { DiningRoomType, ElectricBillType, FloorType, GasType, SubletType } from "@prisma/client";


async function seedProperty() {

    const thanaCount = await prisma.area.count();
    const skip = Math.floor(Math.random() * thanaCount);

    const categories = await prisma.category.findMany();
    const dwellings = await prisma.dwelling.findMany();
    const timeframes = await prisma.timeframe.findMany();
    const amenities = await prisma.amenity.findMany();
    const locations = await prisma.area.findMany({ take: 10, skip, include: { thana: { include: { district: { include: { division: true } } } } } });
    const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const users = await prisma.user.findMany();
    const numbers = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`]

    // Property creation 
    for (let i = 0; i < 20; i++) {

        const randomData = faker.helpers.arrayElement(locations);

        const property = await prisma.property.create({
            data: {
                name: faker.lorem.lines({ min: 2, max: 5 }),
                isActive: true,
                isApproved: true,
                categoryId: faker.helpers.arrayElement(categories).id,
                userId: faker.helpers.arrayElement(users).id,
                divisionId: randomData.thana.district.divisionId,
                districtId: randomData.thana.districtId,
                thanaId: randomData.thanaId,
                areaId: randomData.id,
                mapLink: "https://maps.app.goo.gl/7wT4EPs39eSAoV4h6",
                sectorNo: faker.location.secondaryAddress(),
                roadNo: faker.location.street(),
                houseNo: faker.location.secondaryAddress(),
                dwellingId: faker.helpers.arrayElement(dwellings).id,
                timeFrameId: faker.helpers.arrayElement(timeframes).id,
                availableFrom: faker.helpers.arrayElement(months),
                bedRoomNo: faker.helpers.arrayElement(numbers),
                bathRoomNo: faker.helpers.arrayElement(numbers),
                balconyNo: faker.helpers.arrayElement(numbers),
                floorNo: faker.helpers.arrayElement(numbers),
                kitchenNo: faker.helpers.arrayElement(numbers),
                floorType: faker.helpers.enumValue(FloorType),
                electricBillIncluded: faker.helpers.enumValue(ElectricBillType),
                diningRoomAvailbility: faker.helpers.enumValue(DiningRoomType),
                lineGasType: faker.helpers.enumValue(GasType),
                isRoomType: faker.helpers.enumValue(SubletType),
                size: faker.number.float({ min: 2000, max: 5000 }),
                description: faker.lorem.lines({ min: 10, max: 30 }),
                ownerName: faker.person.fullName(),
                ownerPhone: faker.phone.number(),
                rentPrice: faker.number.float({ min: 5000, max: 40000 }),
                serviceCharge: faker.number.float({ min: 5000, max: 40000 }),
                gasPrice: faker.number.float({ min: 5000, max: 40000 }),
            }
        })

        for (let i = 0; i < 2; i++) {
            const propertyFacility = await prisma.propertyFacility.create({
                data: {
                    propertyId: property.id,
                    amenityId: faker.helpers.arrayElement(amenities).id,
                    isAvailable: faker.datatype.boolean()
                }
            })

            //! console property facility
            console.log(propertyFacility);
        }

        const images = await getImageNow();
        const getImageObjects: ImageType = JSON.parse(JSON.stringify(images?.response?.results));

        for (let i = 0; i < getImageObjects.length; i++) {
            const currrImage = getImageObjects[i];
            const propertyImage = await prisma.image.create({
                data: {
                    propertyId: property.id,
                    image_url: currrImage.urls.regular as string,
                    isDeleted: false,
                }
            })

            //!console property image
            console.log(propertyImage);
        }
    }



}

export const PropertySeeder = { seedProperty }