import { z } from 'zod';

export const RoleSchema = z.enum(['COMMON', 'EDITOR', 'ADMIN']);

export const UserCreateSchema = z.object({
  login: z.string(),
  name: z.string(),
  password: z.string(),
  cpf: z.string(),
  role: RoleSchema.optional(),
});

export const UserReturnSchema = UserCreateSchema.extend({
  id: z.string().uuid(),
  email: z.string().nullable(),
  created_at: z.date(),
  is_active: z.boolean(),
  is_first_access: z.boolean(),
}).omit({ password: true });

export const UserUpdateRequestSchema = UserCreateSchema.extend({
  email: z.string().email(),
  old_password: z.string(),
  is_active: z.boolean().optional(),
  is_first_access: z.boolean().optional(),
})
  .omit({ login: true, cpf: true })
  .partial();

export const UserArraySchema = UserReturnSchema.array();
