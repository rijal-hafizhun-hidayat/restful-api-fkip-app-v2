-- AlterTable
ALTER TABLE `plp` ADD COLUMN `school_year_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `school_year` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plp` ADD CONSTRAINT `plp_school_year_id` FOREIGN KEY (`school_year_id`) REFERENCES `school_year`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
