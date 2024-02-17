import { NextResponse } from "next/server";

import { HttpError } from "@portal/utils/http";

import userService from "../user.services";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userData = await userService.get(params.id);
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
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
    const userData = await userService.update(params.id, body);
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error, { status: error.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userDeleted = await userService.delete(params.id);
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
