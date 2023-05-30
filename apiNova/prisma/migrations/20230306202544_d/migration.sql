/*
  Warnings:

  - You are about to alter the column `Preco` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(14,6)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `Preco` DECIMAL(14, 6) NOT NULL;
