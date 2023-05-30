/*
  Warnings:

  - Added the required column `valor_unit_total` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `valor_unit_total` DECIMAL(16, 2) NOT NULL;
