export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
  processed: boolean;
}
