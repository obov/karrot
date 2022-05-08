import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "DELETE";
interface ConfigType {
  methodsAllowed: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
const handlerHugged = ({
  methodsAllowed,
  handler,
  isPrivate = true,
}: ConfigType) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method && !methodsAllowed.includes(req.method as any))
      return res.status(405).end();
    if (isPrivate && !req.session.user) {
      res.status(401).json({ ok: false, error: "Plz log in" });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log("error : ", error);
      return res.status(500).json({ error });
    }
  };
};
export default handlerHugged;
