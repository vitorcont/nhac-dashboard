import { NextResponse, NextRequest } from "next/server";

import { verifyToken } from "./utils/jwt";

export const config = {
  matcher: "/api/user/:path*",
};

export async function middleware(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      throw Error();
    }

    const userData = await verifyToken(token, process.env.JWT_SECRET as string);

    request.headers.set("user", JSON.stringify(userData));
    return NextResponse.next({ request: { headers: request.headers } });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
