-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accommodate_colleger_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accommodate_plp_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` DROP FOREIGN KEY `accomodate_tutor_teacher_id_fkey`;

-- CreateTable
CREATE TABLE `accommodate_dpl_colleger` (
    `ind` INTEGER NOT NULL AUTO_INCREMENT,
    `colleger_id` INTEGER NULL,
    `dpl_id` INTEGER NULL,
    `plp_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ind`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` ADD CONSTRAINT `accommodate_tutor_teacher_colleger_colleger_id_fkey` FOREIGN KEY (`colleger_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` ADD CONSTRAINT `accommodate_tutor_teacher_colleger_tutor_teacher_fkey` FOREIGN KEY (`tutor_teacher_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodate_tutor_teacher_colleger` ADD CONSTRAINT `accommodate_tutor_teacher_colleger_plp_id_fkey` FOREIGN KEY (`plp_id`) REFERENCES `plp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodate_dpl_colleger` ADD CONSTRAINT `accommodate_dpl_colleger_colleger_id_fkey` FOREIGN KEY (`colleger_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodate_dpl_colleger` ADD CONSTRAINT `accommodate_dpl_colleger_dpl_id_fkey` FOREIGN KEY (`dpl_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodate_dpl_colleger` ADD CONSTRAINT `accommodate_dpl_colleger_plp_id` FOREIGN KEY (`plp_id`) REFERENCES `plp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
