import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CustomJwtPayload {
  id: string;
  email: string;
  phone: string;
  iat: number;
  exp: number;
  role: string;
}
export function decodeToken(token: string): CustomJwtPayload | null {
  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} MMK`;
};

export const calculateSubtotal = (
  items: { price: number; quantity: number }[]
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const generateOrderNumber = (): string => {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `#ORD-${timestamp}${random}`;
};

// const baseUrl = import.meta.env.VITE_BASE_URL;
// export function UploadImage() {

// }
