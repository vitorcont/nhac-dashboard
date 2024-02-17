import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";
import itemsService from "../items.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const items = await itemsService.get(params.id);
    if (!items) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(items);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const items = await itemsService.update(params.id, body);
    if (!items) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(items);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userDeleted = await itemsService.delete(params.id);
    if (!userDeleted) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(userDeleted);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
