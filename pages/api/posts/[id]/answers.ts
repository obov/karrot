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
    body: { answer: answerFromClient },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +idFromClient.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    console.log(
      "post : ",
      post,
      "Maybe have a problem of post that nico have told before."
    );
  }
  const answer = await client.answer.create({
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
      answer: answerFromClient,
    },
  });
  console.log("answer : ", answer);
  res.json({
    ok: true,
    answer,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["POST"], handler })
);
