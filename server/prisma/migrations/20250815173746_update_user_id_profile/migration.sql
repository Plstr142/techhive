/*
  Warnings:

  - You are about to drop the column `username` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,profilename]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropIndex
DROP INDEX `Profile_userId_key` ON `profile`;

-- DropIndex
DROP INDEX `Profile_username_key` ON `profile`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `username`,
    ADD COLUMN `profilename` VARCHAR(191) NULL DEFAULT 'default_profile';

-- CreateIndex
CREATE UNIQUE INDEX `Profile_userId_profilename_key` ON `Profile`(`userId`, `profilename`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
