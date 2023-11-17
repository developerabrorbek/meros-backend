/*
  Warnings:

  - Added the required column `status` to the `translate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "translate" ADD COLUMN     "status" "Status" NOT NULL;
