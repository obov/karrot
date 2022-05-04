import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body : ", req.body);
  return res.status(200).end();
};

export default withHandler("POST", handler);
