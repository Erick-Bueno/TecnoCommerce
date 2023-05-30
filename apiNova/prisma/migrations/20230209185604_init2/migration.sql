/*
  Warnings:

  - Added the required column `Bairro` to the `Enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cep` to the `Enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cidade` to the `Enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nome` to the `Enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Numero` to the `Enderecos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rua` to the `Enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `enderecos` ADD COLUMN `Bairro` TEXT NOT NULL,
    ADD COLUMN `Cep` TEXT NOT NULL,
    ADD COLUMN `Cidade` TEXT NOT NULL,
    ADD COLUMN `Nome` TEXT NOT NULL,
    ADD COLUMN `Numero` INTEGER NOT NULL,
    ADD COLUMN `Rua` TEXT NOT NULL;
