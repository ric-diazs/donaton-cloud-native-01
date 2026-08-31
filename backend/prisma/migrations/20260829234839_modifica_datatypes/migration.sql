/*
  Warnings:

  - You are about to alter the column `tipo` on the `donacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nombre_donante` on the `donacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `correo_donante` on the `donacion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `tipo_necesidad` on the `necesidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `descripcion` on the `necesidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `prioridad` on the `necesidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `comunidad_afectada` on the `necesidad` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `nombre` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `correo` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nombre_org` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "donacion" ALTER COLUMN "tipo" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "nombre_donante" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "correo_donante" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "necesidad" ALTER COLUMN "tipo_necesidad" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "descripcion" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "prioridad" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "comunidad_afectada" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "correo" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nombre_org" SET DATA TYPE VARCHAR(100);
