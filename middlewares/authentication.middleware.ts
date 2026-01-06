import { RequestHandler } from "express";

import prisma from "@/prisma";
import { idTokenVerifier } from "@/utils/auth.utils";

export const authenticateAsUser: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No Valid Token Provided" });
  }

  try {
    const payload = await idTokenVerifier.verify(token);
    const cognitoId = payload.sub as string;
    const email = payload.email as string;
    const name = payload.name as string;

    const existingUser = await prisma.user.findUnique({
      where: { cognitoId },
    });

    if (existingUser) {
      if (existingUser.email !== email || existingUser.username !== name) {
        const user = await prisma.user.update({
          where: { cognitoId: cognitoId },
          data: { email, username: name },
        });
        req.user = user;
        return next();
      }
      req.user = existingUser;
      return next();
    } else {
      const user = await prisma.user.create({
        data: { cognitoId, email, username: name },
      });
      req.user = user;
      return next();
    }
  } catch {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
};
