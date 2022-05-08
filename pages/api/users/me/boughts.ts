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
  const boughts = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: "Bought",
    },
  });
  res.json({
    ok: true,
    boughts,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
