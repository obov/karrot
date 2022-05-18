import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  console.log("you are bot : ", req.ua?.isBot);
  if (req.ua?.isBot) {
    return new Response("Not bot plz", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.karrot) {
      const url = req.nextUrl.clone();
      url.pathname = "/enter";
      return NextResponse.redirect(url);
    }
  }
};
export { middleware };
