/*
  Warnings:

  - Made the column `profilename` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `profilename` VARCHAR(191) NOT NULL;
