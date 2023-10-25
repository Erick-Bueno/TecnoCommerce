-- CreateTable
CREATE TABLE `Pedido` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `valorTotal` DECIMAL(16, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemPedido` (
    `id` VARCHAR(191) NOT NULL,
    `idProduct` VARCHAR(191) NOT NULL,
    `idPedido` VARCHAR(191) NOT NULL,
    `quantity` BIGINT NOT NULL,
    `valorTotal` DECIMAL(16, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPedido` ADD CONSTRAINT `ItemPedido_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
