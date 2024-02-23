import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import userService from "./user.services";

export async function GET() {
  try {
    const list = await userService.list();
    console.log(list);

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userData = await userService.create(body);

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
