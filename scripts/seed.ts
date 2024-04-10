const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name : "Fantasy" },
                { name : "Sci-Fi" },
                { name : "Mystery" },
                { name : "One Shot" },
                { name : "Horror" },
                { name : "Cyber-punk" },
            ]
        });
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
};

main();