import { z } from 'zod';

export const UserCreateSchema = z.object({
  login: z.string(),
  name: z.string(),
  password: z.string(),
  cpf: z.string(),
  role: z.enum(['SERV', 'DIRET', 'SECRET', 'ADMIN']).optional(),
  dash: z.enum(['COMMON', 'SCHOOL', 'ORGAN', 'ADMIN']).default('COMMON'),
});

export const UserReturnSchema = UserCreateSchema.extend({
  id: z.string().uuid(),
  email: z.string(),
  created_at: z.date(),
  is_active: z.boolean(),
  is_first_access: z.boolean(),
}).omit({ password: true });

export const UserUpdateRequestSchema = UserCreateSchema.extend({
  email: z.string().email(),
  old_password: z.string(),
  is_active: z.boolean().optional(),
  is_first_access: z.boolean().optional(),
  dash: z.enum(['COMMON', 'SCHOOL', 'ORGAN', 'ADMIN']).optional(),
})
  .omit({ login: true, cpf: true })
  .partial();

export const UserArraySchema = UserReturnSchema.array();
