import { z } from "zod"

export const userBodySchema = z.strictObject({
  password: z.string().trim().min(8),
  username: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(/^[a-z]+$/),
})

export const updateUserBodySchema = z.strictObject({
  newPassword: userBodySchema.shape.password.nullable(),
  prevPassword: userBodySchema.shape.password.nullable(),
  username: userBodySchema.shape.username.nullable(),
})

export const dirBodySchema = z.strictObject({
  name: z.string().min(1).max(20),
})

export const taskBodySchema = z.strictObject({
  deadline: z.string(),
  description: z.string().max(100),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
  title: z.string().min(3).max(35),
})
