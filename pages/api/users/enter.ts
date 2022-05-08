import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHugged, { ResponseType } from "@libs/server/handlerHugged";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const login = phone ? { phone } : email ? { email } : null;
  if (!login) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...login,
          },
          create: {
            name: "Anonymous",
            ...login,
          },
        },
      },
    },
  });
  // if (phone) {
  //   await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });
  // }
  return res.json({
    ok: true,
  });
};

export default handlerHugged({
  methodsAllowed: ["POST"],
  handler,
  isPrivate: false,
});
