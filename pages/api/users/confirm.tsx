import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { token: tokenFromClient } = req.body;
  const tokenFound = await client.token.findUnique({
    where: {
      payload: tokenFromClient,
    },
  });
  if (!tokenFound) return res.status(404).end();
  req.session.user = {
    id: tokenFound.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: tokenFound.userId,
    },
  });
  res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["POST"], handler, isPrivate: false })
);
