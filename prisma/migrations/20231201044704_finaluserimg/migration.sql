/*
  Warnings:

  - Made the column `userImage` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userImage" SET NOT NULL;
