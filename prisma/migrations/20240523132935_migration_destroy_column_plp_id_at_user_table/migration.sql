/*
  Warnings:

  - You are about to drop the column `plp_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `plp_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `plp_id`;
