import type { NextRequest, NextFetchEvent } from "next/server";

const middleware = (req: NextRequest, evt: NextFetchEvent) => {
  console.log("chats ONLY middleware");
};
export { middleware };
