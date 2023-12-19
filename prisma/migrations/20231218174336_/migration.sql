/*
  Warnings:

  - You are about to drop the column `monthId` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the `months` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_monthId_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "monthId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "months";
