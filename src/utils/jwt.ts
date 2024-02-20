import { jwtVerify } from "jose";

export const verifyToken = async (token: string, secret: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
};
