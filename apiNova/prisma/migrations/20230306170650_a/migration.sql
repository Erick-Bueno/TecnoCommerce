/*
  Warnings:

  - You are about to alter the column `Preco` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `NomeProduto` LONGTEXT NOT NULL,
    MODIFY `Preco` DECIMAL NOT NULL;
