import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import authService from "./auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await authService.login(body);
    return NextResponse.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
