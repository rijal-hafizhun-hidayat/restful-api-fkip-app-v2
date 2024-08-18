/*
  Warnings:

  - You are about to drop the `accommodate_dpl_colleger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodate_tutor_teacher_colleger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `school_year` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `accommodate_dpl_colleger` DROP FOREIGN KEY `accommodate_dpl_colleger_colleger_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_dpl_colleger` DROP FOREIGN KEY `accommodate_dpl_colleger_dpl_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_dpl_colleger` DROP FOREIGN KEY `accommodate_dpl_colleger_plp_id`;

-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accommodate_tutor_teacher_colleger_colleger_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accommodate_tutor_teacher_colleger_plp_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accommodate_tutor_teacher_colleger_tutor_teacher_fkey`;

-- DropForeignKey
ALTER TABLE `plp` DROP FOREIGN KEY `plp_school_year_id`;

-- DropForeignKey
ALTER TABLE `school` DROP FOREIGN KEY `school_plp_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `role_id_fkey`;

-- DropTable
DROP TABLE `accommodate_dpl_colleger`;

-- DropTable
DROP TABLE `accommodate_tutor_teacher_colleger`;

-- DropTable
DROP TABLE `plp`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `school`;

-- DropTable
DROP TABLE `school_year`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `guard` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school_years` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plp_school_years` (
    `plp_id` INTEGER NOT NULL,
    `school_year_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`plp_id`, `school_year_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_prodis` (
    `user_id` INTEGER NOT NULL,
    `prodi_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`, `prodi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school_plps` (
    `school_id` INTEGER NOT NULL,
    `plp_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`school_id`, `plp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id_dpl` INTEGER NULL,
    `user_id_tutor_teacher` INTEGER NULL,
    `user_id_colleger` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_plps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `plp_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prodis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guidance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guidance_statement` VARCHAR(255) NOT NULL,
    `guidance_stage` VARCHAR(255) NOT NULL,
    `guidance_note` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plp_school_years` ADD CONSTRAINT `plp_school_years_plp_id_fkey` FOREIGN KEY (`plp_id`) REFERENCES `plps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plp_school_years` ADD CONSTRAINT `plp_school_years_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_prodis` ADD CONSTRAINT `user_prodis_prodi_id_fkey` FOREIGN KEY (`prodi_id`) REFERENCES `prodis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_prodis` ADD CONSTRAINT `user_prodis_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `school_plps` ADD CONSTRAINT `school_plps_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `school_plps` ADD CONSTRAINT `school_plps_plp_id_fkey` FOREIGN KEY (`plp_id`) REFERENCES `plps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodates` ADD CONSTRAINT `accommodates_user_id_dpl_fkey` FOREIGN KEY (`user_id_dpl`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodates` ADD CONSTRAINT `accommodates_user_id_tutor_teacher_fkey` FOREIGN KEY (`user_id_tutor_teacher`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodates` ADD CONSTRAINT `accommodates_user_id_colleger_fkey` FOREIGN KEY (`user_id_colleger`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_plps` ADD CONSTRAINT `user_plps_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_plps` ADD CONSTRAINT `user_plps_plp_id_fkey` FOREIGN KEY (`plp_id`) REFERENCES `plps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
