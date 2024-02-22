import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import promotionsService from "../promotions.service";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await promotionsService.delete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Promotion not found" }, { status: 404 });
    }

    return NextResponse.json(deleted);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
