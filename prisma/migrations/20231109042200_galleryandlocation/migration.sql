-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetProfile" (
    "petId" SERIAL NOT NULL,
    "petName" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "vaxxed" TEXT NOT NULL,
    "sprayedNeutered" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PetProfile_pkey" PRIMARY KEY ("petId")
);

-- CreateTable
CREATE TABLE "PetPhoto" (
    "photoId" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "petProfileId" INTEGER NOT NULL,

    CONSTRAINT "PetPhoto_pkey" PRIMARY KEY ("photoId")
);

-- CreateTable
CREATE TABLE "LocationInfo" (
    "locationId" SERIAL NOT NULL,
    "cityName" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LocationInfo_pkey" PRIMARY KEY ("locationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PetProfile_userId_key" ON "PetProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LocationInfo_userId_key" ON "LocationInfo"("userId");

-- AddForeignKey
ALTER TABLE "PetProfile" ADD CONSTRAINT "PetProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_petProfileId_fkey" FOREIGN KEY ("petProfileId") REFERENCES "PetProfile"("petId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationInfo" ADD CONSTRAINT "LocationInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
