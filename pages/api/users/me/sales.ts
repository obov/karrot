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
  const sales = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: "Sale",
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    sales,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
