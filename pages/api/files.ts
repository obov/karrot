import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CFLARE_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CFLARE_IMAGES}`,
        },
      }
    )
  ).json();
  console.log("response : ", response);
  res.json({
    ok: true,
    ...response.result,
  });
};

export default withApiSession(
  withHandler({ methodsAllowed: ["GET"], handler })
);
