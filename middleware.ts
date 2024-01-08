export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/posts/:path*", "/account/:path*"],
};

import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export async function  middleware(request: NextRequest) {

//   const session = await getSession();
//   console.log("미들웨어 작동");
// }
