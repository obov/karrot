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
  const favoriteState = await client.favorite.findFirst({
    where: {
      productId: +productId.toString(),
      userId: user?.id,
    },
  });
  if (favoriteState) {
    await client.favorite.delete({
      where: {
        id: favoriteState.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +productId.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["POST"], handler })
);
