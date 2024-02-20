import { NextRequest, NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import userService from "../user.services";

export async function GET(request: NextRequest) {
  try {
    const userRaw = request.headers.get("user");
    const user = JSON.parse(userRaw as string);
    const userData = await userService.get(user.id);

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
