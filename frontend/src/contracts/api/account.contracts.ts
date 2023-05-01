export enum UserRole {
  User = 'User',
  Admin = 'Admin'
}

export interface AccountDTO {
  id: UniqueId;
  email: Email;
  firstname: string;
  lastname: string;
  registrationDate: DateString;
  role: UserRole;
}

export interface UpdateAccountRequest {
  firstname: string;
  lastname: string;
}