/*
  Warnings:

  - Added the required column `valorFrete` to the `ItemPedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itempedido` ADD COLUMN `valorFrete` DECIMAL(16, 2) NOT NULL;
