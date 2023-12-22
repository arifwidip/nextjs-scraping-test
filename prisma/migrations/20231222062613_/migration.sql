-- CreateIndex
CREATE FULLTEXT INDEX `Item_title_idx` ON `Item`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Item_abstract_idx` ON `Item`(`abstract`);

-- CreateIndex
CREATE FULLTEXT INDEX `Item_title_abstract_idx` ON `Item`(`title`, `abstract`);
