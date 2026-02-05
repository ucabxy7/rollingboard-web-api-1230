-- CreateTable
CREATE TABLE "columns" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "columns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "columns_projectId_idx" ON "columns"("projectId");

-- CreateIndex
CREATE INDEX "columns_projectId_order_idx" ON "columns"("projectId", "order");

-- AddForeignKey
ALTER TABLE "columns" ADD CONSTRAINT "columns_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
