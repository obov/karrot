import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;
    const list = await client.product.findMany({
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
      take: 20,
      skip: +page * 10,
    });
    res.json({
      ok: true,
      list,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId ?? "photoId",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }
};

export default withApiSession(
  withHandler({ methodsAllowed: ["POST", "GET"], handler })
);
