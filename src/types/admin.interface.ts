export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  isDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}