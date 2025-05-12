/*
  Warnings:

  - Added the required column `location` to the `PetPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetPhoto" ADD COLUMN     "location" TEXT NOT NULL;
