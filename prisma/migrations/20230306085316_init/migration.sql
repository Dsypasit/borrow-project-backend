-- CreateTable
CREATE TABLE "ProductItems" (
    "id" SERIAL NOT NULL,
    "serial_no" TEXT NOT NULL,
    "broken_status" BOOLEAN NOT NULL DEFAULT false,
    "source_id" INTEGER NOT NULL,
    "lab_id" INTEGER NOT NULL,
    "products_id" INTEGER NOT NULL,

    CONSTRAINT "ProductItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "productItems_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductItems_serial_no_key" ON "ProductItems"("serial_no");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_productItems_id_key" ON "Transactions"("productItems_id");

-- AddForeignKey
ALTER TABLE "ProductItems" ADD CONSTRAINT "ProductItems_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItems" ADD CONSTRAINT "ProductItems_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItems" ADD CONSTRAINT "ProductItems_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_productItems_id_fkey" FOREIGN KEY ("productItems_id") REFERENCES "ProductItems"("serial_no") ON DELETE RESTRICT ON UPDATE CASCADE;
