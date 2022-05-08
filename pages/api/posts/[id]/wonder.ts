import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    query: { id: idFromClient },
    session: { user },
  } = req;
  const already = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +idFromClient.toString(),
    },
    select: {
      id: true,
    },
  });
  console.log("already : ", already);
  if (already) {
    await client.wondering.delete({
      where: {
        id: already.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +idFromClient.toString(),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["POST"], handler })
);
