export type PublicUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  isVerified?: boolean;
  profileImage?: string;
  joinDate?: string;
  lastLogin?: string;
};
