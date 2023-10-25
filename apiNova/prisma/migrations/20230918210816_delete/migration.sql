-- DropForeignKey
ALTER TABLE `avaliacoes` DROP FOREIGN KEY `Avaliacoes_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `Carrinho_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `enderecos` DROP FOREIGN KEY `Enderecos_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `favoritos` DROP FOREIGN KEY `Favoritos_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `itempedido` DROP FOREIGN KEY `ItemPedido_idPedido_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Enderecos` ADD CONSTRAINT `Enderecos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favoritos` ADD CONSTRAINT `Favoritos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacoes` ADD CONSTRAINT `Avaliacoes_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
