-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `abstract` LONGTEXT NULL,
    `totalViews` INTEGER NOT NULL DEFAULT 0,
    `totalDownloads` INTEGER NOT NULL DEFAULT 0,
    `dataSource` VARCHAR(191) NULL,
    `sourceUniqueId` VARCHAR(191) NULL,
    `dates` JSON NULL,
    `details` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Item_sourceUniqueId_key`(`sourceUniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
