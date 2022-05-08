import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
  } = req;
  const favorites = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
  });
  res.json({
    ok: true,
    favorites,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
