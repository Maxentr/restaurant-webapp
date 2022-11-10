export enum Role {
  "ADMIN",
  "CUSTOMER",
}

export type User = {
  _id: string
  name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt: Date
}
