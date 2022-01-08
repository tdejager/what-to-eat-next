import {PrismaClient} from "@prisma/client";

describe("Does it work?", () => {
    it("Works?", async () => {
        const prisma = new PrismaClient();
        await prisma.$connect();
        const result = await prisma.recipe.count()
    });
});
