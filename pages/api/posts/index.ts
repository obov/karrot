import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const postEnlisted = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: { id: user?.id },
        },
      },
    });

    await res.unstable_revalidate("/community");
    res.json({
      ok: true,
      postEnlisted,
    });
  }
  if (req.method === "GET") {
    const {
      query: { latitude, longitude, page },
    } = req;
    const [latFloat, lngFloat] = [latitude, longitude].map((e) => {
      return parseFloat(e.toString());
    });
    console.log("latFloat, lngFloat : ", latFloat, lngFloat);
    const list = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            answers: true,
            wonderings: true,
          },
        },
      },
      where: {
        latitude: {
          gte: latFloat - 0.04,
          lte: latFloat + 0.04,
        },
        longitude: {
          gte: lngFloat - 0.04,
          lte: lngFloat + 0.04,
        },
      },
      take: 20,
      skip: +page * 10,
    });
    res.json({
      ok: true,
      list,
    });
  }
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET", "POST"], handler })
);
