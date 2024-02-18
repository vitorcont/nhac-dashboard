-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BRAZILIAN', 'CHINESE', 'JAPANESE', 'MEXICAN', 'ITALIAN', 'FAST_FOOD', 'VEGETARIAN', 'VEGAN', 'NEW', 'OTHER');

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "category" "Category";
