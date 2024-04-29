-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `plp_id_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `plp_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `plp_id_fkey` FOREIGN KEY (`plp_id`) REFERENCES `plp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
