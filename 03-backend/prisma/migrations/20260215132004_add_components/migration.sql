-- CreateEnum
CREATE TYPE "ComponentCategory" AS ENUM ('PV', 'SKIDS', 'E-House', 'STRUCTURE', 'OTHER');

-- CreateTable
CREATE TABLE "components" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ComponentCategory" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "thickness_mm" DECIMAL(8,2),
    "material" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_components_project" ON "components"("project_id");

-- CreateIndex
CREATE INDEX "idx_components_category" ON "components"("category");

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
