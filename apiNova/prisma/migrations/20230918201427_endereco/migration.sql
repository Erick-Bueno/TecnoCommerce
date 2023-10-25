/*
  Warnings:

  - Added the required column `enderecoId` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `enderecoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Enderecos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
