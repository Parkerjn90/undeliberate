/*
  Warnings:

  - The primary key for the `postCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Replies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `postCategories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `postCategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Replies` DROP FOREIGN KEY `Replies_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `postCategories` DROP FOREIGN KEY `postCategories_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `postCategories` DROP FOREIGN KEY `postCategories_postId_fkey`;

-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `postNum` INTEGER NULL,
    MODIFY `title` TEXT NULL,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `author` TEXT NULL,
    MODIFY `image` TEXT NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `description` TEXT NOT NULL,
    MODIFY `draft` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `postCategories` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `postId` VARCHAR(45) NOT NULL,
    MODIFY `categoryId` VARCHAR(45) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Categories`;

-- DropTable
DROP TABLE `Comments`;

-- DropTable
DROP TABLE `PageInfo`;

-- DropTable
DROP TABLE `Replies`;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `replies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commentsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pageDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `about` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `id_UNIQUE` ON `Posts`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `id_UNIQUE` ON `postCategories`(`id`);

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_postsId_fkey` FOREIGN KEY (`postsId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
