import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.recipe.upsert({
        where: {id: 1},
        update: {},
        create: {title: "Pittige aardappelschotel", content: "Dit is lekker"}
    });

    await prisma.recipe.upsert({
        where: {id: 2},
        update: {},
        create: {
            title: "Vegan Bibimibap",
            url: "https://www.culy.nl/recepten/vegan-bibimbap/",
            imageUrl: "https://img.culy.nl/images/rF4m0ACAvUZTmLHh7hG9xYQOgBE=/1720x606/smart/filters:quality(80):format(jpeg):background_color(fff)/https%3A%2F%2Fwww.culy.nl%2Fwp-content%2Fuploads%2F2022%2F01%2FDSC06244.jpg"
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })