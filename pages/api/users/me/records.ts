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
  const kindStr = kind.toString();
  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kindStr as Kind,
    },
  });
  res.json({
    ok: true,
    [kindStr]: records,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
