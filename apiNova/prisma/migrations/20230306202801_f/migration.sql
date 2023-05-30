/*
  Warnings:

  - You are about to alter the column `Preco` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,6)` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `Preco` DECIMAL(12, 2) NOT NULL;
