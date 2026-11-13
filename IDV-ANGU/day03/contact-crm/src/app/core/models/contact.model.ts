export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  categoryId: number | null;
  favorite: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
