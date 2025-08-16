-- AlterTable
ALTER TABLE `profile` ADD COLUMN `profilename` VARCHAR(191) NOT NULL DEFAULT 'default_profile',
    ALTER COLUMN `username` DROP DEFAULT;
