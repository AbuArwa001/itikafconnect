-- AlterTable
ALTER TABLE `users` ADD COLUMN `id_back` VARCHAR(512) NULL,
    ADD COLUMN `id_front` VARCHAR(512) NULL,
    ADD COLUMN `next_of_kin` VARCHAR(512) NULL,
    ADD COLUMN `next_of_kin_no` VARCHAR(20) NULL;
