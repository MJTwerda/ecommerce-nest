import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/users.interfaces";

const MOCK_USERS: Array<User> = [
  {
    id: 1,
    email: 'pZjvO@example.com',
    name: 'John Doe',
    password: '12345678',
    address: '123 Main St',
    phone: '123-456-7890',
    country: 'USA',
    city: 'New York',
  },
  {
    id: 2,
    email: 'IbQpC@example.com',
    name: 'Jane Dummy',
    password: '87654321',
    address: '456 Main St',
    phone: '123-456-7890',
  }
]

@Injectable()
export class UsersRepository {
  constructor() {};

  getUsersList(): Array<User> { 
    return MOCK_USERS;
  }
};