export interface User {
  id: string
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UserWithCredentials extends User {
  password: string | null;
  salt: string;
}

export interface UserCreationInput extends Omit<User, 'id'> {
  password: string;
}

export interface UserUpdateInput extends Partial<Omit<UserCreationInput, 'email'>> {
  oldPassword?: string;
}
