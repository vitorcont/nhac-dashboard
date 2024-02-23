import { NextRequest } from "next/server";

import { prismaMock } from "../../../../prisma/singleton";

import * as UserRoutes from "./route";

jest.mock("../../../../prisma/prisma.ts");

describe("user route tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should handle list users request", async () => {
    const mockList = [{ name: "Test User" }];
    (prismaMock.user.findMany as jest.Mock).mockResolvedValue(mockList);

    const response: Response = await UserRoutes.GET();
    const body = await response.json();

    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect({ body, status: response.status }).toEqual({ body: mockList, status: 200 });
  });

  it("should handle create user request", async () => {
    const mockUser = { name: "Test User", email: "string", password: "data" };
    (prismaMock.user.create as jest.Mock).mockResolvedValue(mockUser);

    const request = new NextRequest("http://localhost:3000/api/user", {
      body: JSON.stringify(mockUser),
      method: "POST",
    });

    const response: Response = await UserRoutes.POST(request);
    const body = await response.json();

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect({ body, status: response.status }).toEqual({ body: mockUser, status: 200 });
  });
});
