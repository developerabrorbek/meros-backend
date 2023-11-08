-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('completed', 'shippped', 'cancelled');

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "ordered_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destination" VARCHAR NOT NULL,
    "longitude" VARCHAR,
    "latitude" VARCHAR,
    "status" "OrderStatus" NOT NULL,
    "user_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
