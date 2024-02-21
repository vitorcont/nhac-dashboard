import { NextRequest } from "next/server";

export const protectedRoutes = [
  {
    regex: /\/user/,
    methods: ["POST", "PUT", "DELETE", "GET"],
  },
  {
    regex: /\/favorite/,
    methods: ["POST", "DELETE"],
  },
];

export const isRouteFree = (request: NextRequest) => {
  const route = request.url.split("/api")[1];

  const mainProtected = protectedRoutes.find((item) => item.regex.test(route));
  if (!mainProtected) return true;

  const method = request.method;
  const subProtected = mainProtected.methods.find((m: string) => m.includes(method));
  return !subProtected;
};
