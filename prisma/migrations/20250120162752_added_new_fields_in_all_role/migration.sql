-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "address" TEXT,
ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "bio" TEXT;
