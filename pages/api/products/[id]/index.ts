import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    query: { id: productId },
    session: { user },
  } = req;
  const idForDB = +productId.toString();
  const product = await client.product.findUnique({
    where: {
      id: idForDB,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const termsToSearch = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: termsToSearch,
      AND: {
        id: {
          not: idForDB,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        productId: idForDB,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  console.log("relatedProducts : ", relatedProducts);
  console.log("termsToSearch : ", termsToSearch);
  console.log("product : ", product);
  res.json({ ok: true, product, relatedProducts, isLiked });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
