-- CreateTable
CREATE TABLE `Promocoes` (
    `id` VARCHAR(191) NOT NULL,
    `idProduct` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promocoes` ADD CONSTRAINT `Promocoes_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
