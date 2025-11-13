/*
  Warnings:

  - Made the column `profilePhoto` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "profilePhoto" SET NOT NULL;
