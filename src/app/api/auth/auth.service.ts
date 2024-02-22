import jwt from "jsonwebtoken";

import { comparePassword, encryptString } from "@portal/utils/encryption";
import { HttpError } from "@portal/utils/http";
import prismaService from "@prisma/prisma";

const authService = {
  login: async (body: IAuth.IAuthenticate) => {
    try {
      const { email, password } = body;
      if (!email || !password) {
        throw new HttpError(400, "Email and password are required");
      }
      const hashedEmail = await encryptString(email);
      const user = await prismaService.user.findFirst({
        where: {
          email: hashedEmail,
        },
      });

      if (!user) {
        throw new HttpError(400, "Password not valid");
      }

      const passwordMatched = await comparePassword(body.password, user.password);
      if (!passwordMatched) {
        throw new HttpError(400, "Password not valid");
      }
      const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "4h",
      });

      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  refresh: async (token: string, refreshToken: string, user: IUser.IUser) => {
    try {
      const accessValidated = jwt.verify(token, process.env.JWT_SECRET as string);
      const refreshValidated = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

      return accessValidated;
    } catch (error) {
      console.error(error);
      throw new HttpError(401, "Invalid token");
    }
  },
};

export default authService;
