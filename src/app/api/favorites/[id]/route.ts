import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import favoritesService from "../favorites.service";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const list = await favoritesService.delete(params.id);

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
