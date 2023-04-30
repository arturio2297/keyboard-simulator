export enum UserRole {
  User = 'User',
  Admin = 'Admin'
}

export interface AccountDTO {
  email: Email;
  firstname: string;
  lastname: string;
  registrationDate: DateString;
  role: UserRole;
}