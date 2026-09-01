// Este enum es tomado directamente del definido por Prisma en el Backend
export const Rol = {
  ADMIN: 'ADMIN',
  VOLUNTARIO: 'VOLUNTARIO',
  COLABORADOR: 'COLABORADOR'
} as const

export type Rol = (typeof Rol)[keyof typeof Rol]
