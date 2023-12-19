/*
  Warnings:

  - You are about to drop the column `essential` on the `movements` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `movements` table. All the data in the column will be lost.
  - Added the required column `descriotion` to the `movements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `movements` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "movements" DROP COLUMN "essential",
DROP COLUMN "name",
ADD COLUMN     "descriotion" TEXT NOT NULL,
ADD COLUMN     "type" "EnumType" NOT NULL;
