import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CustomJwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
export function getRoleFromToken(token: string): CustomJwtPayload | null {
  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
