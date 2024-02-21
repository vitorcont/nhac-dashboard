import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import favoritesService from "./favorites.service";

export async function POST(request: Request) {
  try {
    const userRaw = request.headers.get("user");
    if (!userRaw) {
      throw new HttpError(400, "Bad Request");
    }
    const user = JSON.parse(userRaw);

    const body = await request.json();
    const userData = await favoritesService.create({
      restaurantId: body.restaurantId,
      userId: user.id,
    });

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
