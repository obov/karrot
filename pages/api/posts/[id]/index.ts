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
  const post = await client.post.findUnique({
    where: {
      id: +idFromClient.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });
  if (!post) {
    console.log(
      "post : ",
      post,
      "Maybe have a problem of post that nico have told before."
    );
  }
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +idFromClient.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({
    ok: true,
    post,
    isWondering,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
