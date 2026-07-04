import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const secret = encoder.encode(
  process.env.ADMIN_SESSION_SECRET ?? "super-cars-dev-secret-change-me",
);

export type AdminSessionPayload = {
  adminId: string;
  email: string;
  fullName: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function signAdminSession(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminSession(token: string) {
  try {
    const verified = await jwtVerify<AdminSessionPayload>(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}
