/*
  Warnings:

  - Added the required column `promovalor` to the `Promocoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promocoes` ADD COLUMN `promovalor` DECIMAL(16, 2) NOT NULL;
