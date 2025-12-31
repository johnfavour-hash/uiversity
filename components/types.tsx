export interface Faculty {
  id: string; // UUID from backend
  name: string;
}

export interface AccountRecord {
  id?: string; // Optional for mock data, required for API operations
  code: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Not Active" | "Pending" | "Not Certified" | "Certified";
}
