-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'VOLUNTARIO', 'COLABORADOR') NOT NULL DEFAULT 'VOLUNTARIO',
    `nombre_org` VARCHAR(191) NULL,

    UNIQUE INDEX `usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `peso` DECIMAL(65, 30) NOT NULL,
    `nombre_donante` VARCHAR(191) NULL,
    `correo_donante` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `necesidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_necesidad` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `prioridad` VARCHAR(191) NOT NULL,
    `comunidad_afectada` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
