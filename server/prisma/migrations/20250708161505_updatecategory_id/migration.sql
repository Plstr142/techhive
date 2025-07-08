/*
  Warnings:

  - You are about to drop the column `productOnCartId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `productOnCartId` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `productOnCartId`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `productOnCartId`,
    ADD COLUMN `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
