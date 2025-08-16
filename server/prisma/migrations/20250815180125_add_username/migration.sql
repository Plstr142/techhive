/*
  Warnings:

  - You are about to drop the column `profilename` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Profile_profilename_key` ON `profile`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `profilename`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT 'temp_username';

-- CreateIndex
CREATE UNIQUE INDEX `Profile_username_key` ON `Profile`(`username`);
