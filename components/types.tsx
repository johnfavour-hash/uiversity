export interface SubOrganization {
  id: string;
  name: string;
  code: string;
  type: "FACULTY" | "DEPARTMENT";
  universityId: string;
  parentId: string | null;
  isActive: boolean;
}

export interface AccountRecord {
  id?: string;
  code: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Not Active" | "Pending" | "Not Certified" | "Certified";
}
