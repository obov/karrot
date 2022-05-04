import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  console.log("req.body : ", req.body);
  res.status(200).end();
};

export default handler;
