import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import restaurantsService from "../restaurants.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userRaw = request.headers.get("user");
    const user = JSON.parse(userRaw ?? "{}");

    const restaurant = await restaurantsService.get(params.id, user?.id);
    if (!restaurant) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
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
    const restaurant = await restaurantsService.update(params.id, body);
    if (!restaurant) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userDeleted = await restaurantsService.delete(params.id);
    if (!userDeleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userDeleted);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
