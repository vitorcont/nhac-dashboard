import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import restaurantsService from "../restaurants.service";

export async function GET(request: Request) {
  try {
    const userRaw = request.headers.get("user");
    const user = JSON.parse(userRaw ?? "{}");
    const list = await restaurantsService.listFavorites(user?.id);

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
