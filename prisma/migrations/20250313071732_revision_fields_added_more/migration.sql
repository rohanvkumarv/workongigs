-- CreateTable
CREATE TABLE "RevisionResponse" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "revisionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevisionResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RevisionResponse" ADD CONSTRAINT "RevisionResponse_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
