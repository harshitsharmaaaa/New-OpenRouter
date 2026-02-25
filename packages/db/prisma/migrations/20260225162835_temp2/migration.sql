/*
  Warnings:

  - You are about to alter the column `input_token_cost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `output_token_cost` on the `ModelProviderMapping` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "creditsConsumed" SET DEFAULT 1000;

-- AlterTable
ALTER TABLE "ModelProviderMapping" ALTER COLUMN "input_token_cost" SET DATA TYPE INTEGER,
ALTER COLUMN "output_token_cost" SET DATA TYPE INTEGER;
