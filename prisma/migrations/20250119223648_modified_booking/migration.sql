/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_title_key" ON "Schedule"("title");
