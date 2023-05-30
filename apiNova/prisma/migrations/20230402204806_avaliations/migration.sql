-- CreateTable
CREATE TABLE `Avaliacoes` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_product` VARCHAR(191) NOT NULL,
    `Comentario` LONGTEXT NOT NULL,
    `Nota` DECIMAL(2, 1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Avaliacoes` ADD CONSTRAINT `Avaliacoes_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avaliacoes` ADD CONSTRAINT `Avaliacoes_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
