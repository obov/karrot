import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
interface Cookies {}
const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  if (req?.ua?.isBot) {
    return new Response("Not bot plz", { status: 403 });
  } else if (req?.ua?.isBot !== undefined) {
    // unstable_revalidate
    if (!req?.url.includes("/api")) {
      if (!req?.url.includes("/enter") && !req.cookies.karrot) {
        const url = req.nextUrl.clone();
        url.pathname = "/enter";
        return NextResponse.redirect(url);
      }
    }
  }
};
export { middleware };
