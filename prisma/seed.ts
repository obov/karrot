import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const main = async () => {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      // @ts-ignore
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${item + 1}/500`);
  });
};
main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
