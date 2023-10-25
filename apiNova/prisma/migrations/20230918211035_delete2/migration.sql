-- DropForeignKey
ALTER TABLE `avaliacoes` DROP FOREIGN KEY `Avaliacoes_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `Carrinho_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `Favoritos_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `itempedido` DROP FOREIGN KEY `ItemPedido_idProduct_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_enderecoId_fkey`;

-- DropForeignKey
ALTER TABLE `promocoes` DROP FOREIGN KEY `Promocoes_idProduct_fkey`;

-- AddForeignKey
ALTER TABLE `Promocoes` ADD CONSTRAINT `Promocoes_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoritos` ADD CONSTRAINT `Favoritos_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacoes` ADD CONSTRAINT `Avaliacoes_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Enderecos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
