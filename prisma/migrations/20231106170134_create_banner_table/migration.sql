-- CreateEnum
CREATE TYPE "BannerPriority" AS ENUM ('first', 'second', 'third', 'fourth', 'fifth');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "banner" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "image" VARCHAR NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);
