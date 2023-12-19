-- DropForeignKey
ALTER TABLE "movements" DROP CONSTRAINT "movements_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "movements" ADD CONSTRAINT "movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
