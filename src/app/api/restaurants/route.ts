import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import restaurantsService from "./restaurants.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchedValue = url.searchParams.get("search");
    const list = await restaurantsService.list(searchedValue);

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
    const userData = await restaurantsService.create(body);

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
