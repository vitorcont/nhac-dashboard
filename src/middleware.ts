import { NextResponse, NextRequest } from "next/server";

import { isRouteFree } from "./utils/guards";
import { verifyToken } from "./utils/jwt";

export const config = {
  matcher: "/api/:path*",
};

export async function middleware(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.split("Bearer ")[1];
    if (token) {
      const userData = await verifyToken(token ?? "", process.env.JWT_SECRET as string);
      request.headers.set("user", JSON.stringify(userData));
    }

    const isFree = isRouteFree(request);
    if (isFree) {
      return NextResponse.next({ request: { headers: request.headers } });
    }

    if (!token) {
      throw Error();
    }

    return NextResponse.next({ request: { headers: request.headers } });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
