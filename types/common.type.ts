export type ObjectId = string

// T keys but only the ones that are arrays
export type KeyofIsArray<T> = {
  [K in keyof T]: T[K] extends readonly unknown[] ? K : never
}[keyof T]

// Check if ArrayType is an array and if it is, return the type of the array
export type GetTypeFromArray<ArrayType> =
  ArrayType extends readonly (infer Type)[] ? Type : never
