export interface User {
  id: string
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserCreationInput {
  firstName: string;
  lastName: string;
  phone: string;
}
