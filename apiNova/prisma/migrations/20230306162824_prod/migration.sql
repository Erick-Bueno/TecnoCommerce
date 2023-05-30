-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `NomeProduto` TEXT NOT NULL,
    `DescProduto` LONGTEXT NOT NULL,
    `Quantidade` INTEGER NOT NULL,
    `Preco` DECIMAL NOT NULL,
    `img` LONGTEXT NOT NULL,
    `Vendidos` INTEGER NOT NULL,
    `Modelo` TEXT NOT NULL,
    `Marca` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
