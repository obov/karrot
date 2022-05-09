import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { Kind } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
    query: { kind },
  } = req;
  const kindStr = kind.toString() as Kind;
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kindStr,
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
  const counts = await client.record.count({
    where: {
      kind: kindStr,
    },
  });
  res.json({
    ok: true,
    [kindStr]: { records, counts },
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
