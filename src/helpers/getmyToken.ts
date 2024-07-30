import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/lib/interfaces/interfaces";

export const getMyToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    console.log("No token present.");
    return null;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};
