export type Language = "en" | "es";

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}
