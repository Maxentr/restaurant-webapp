import { ObjectId } from "./common.type"

export enum Role {
  "ADMIN",
  "CUSTOMER",
}

export type User = {
  _id: ObjectId
  name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt: Date
}
