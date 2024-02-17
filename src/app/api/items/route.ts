import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import itemsService from "./items.service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchedValue = url.searchParams.get("search");
    const list = await itemsService.list(searchedValue);

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
    const userData = await itemsService.create(body);

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
