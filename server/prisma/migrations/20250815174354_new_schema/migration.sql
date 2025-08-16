/*
  Warnings:

  - A unique constraint covering the columns `[profilename]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Profile_profilename_key` ON `Profile`(`profilename`);
