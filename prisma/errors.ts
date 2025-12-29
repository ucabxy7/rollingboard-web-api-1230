import { Prisma } from "@prisma/client";

// P2025 & P2015 are Prisma's frequent "not found" error codes.
// References:
// https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
// https://www.prisma.io/docs/orm/reference/error-reference#p2025
export const isPrismaNotFoundError = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  ["P2025", "P2015"].includes(error.code);
