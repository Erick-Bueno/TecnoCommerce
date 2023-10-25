/*
  Warnings:

  - You are about to drop the column `valorFrete` on the `itempedido` table. All the data in the column will be lost.
  - Added the required column `valorFrete` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itempedido` DROP COLUMN `valorFrete`;

-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `valorFrete` DECIMAL(16, 2) NOT NULL;
