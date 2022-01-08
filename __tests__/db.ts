import {PrismaClient} from "@prisma/client";

describe("Database", () => {
    it("Is database seeded", async () => {
        const prisma = new PrismaClient();
        await prisma.$connect();
        const result = await prisma.recipe.count();
        expect(result).toBe(2);
    });
});
