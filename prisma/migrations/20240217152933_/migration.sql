/*
  Warnings:

  - You are about to drop the column `zip_code` on the `address` table. All the data in the column will be lost.
  - Added the required column `zipcode` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_user_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "zip_code",
ADD COLUMN     "zipcode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
