import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions = {
  cookieName: "karrot",
  password: process.env.COOKIE_PASSWORD!,
};
export const withApiSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};
export const withSsrSession = (handler: any) => {
  return withIronSessionSsr(handler, cookieOptions);
};
