/*
  Warnings:

  - You are about to alter the column `Preco` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(16,2)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `Preco` DECIMAL(16, 2) NOT NULL;
