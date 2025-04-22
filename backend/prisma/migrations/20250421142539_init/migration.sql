/*
  Warnings:

  - The primary key for the `AlbumGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArtistGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LikedSong` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SongPlaylist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[albumId,genreId]` on the table `AlbumGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artistId,genreId]` on the table `ArtistGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,songId]` on the table `LikedSong` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playlistId,songId]` on the table `SongPlaylist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AlbumGenre" DROP CONSTRAINT "AlbumGenre_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AlbumGenre" DROP CONSTRAINT "AlbumGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistGenre" DROP CONSTRAINT "ArtistGenre_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistGenre" DROP CONSTRAINT "ArtistGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "LikedSong" DROP CONSTRAINT "LikedSong_songId_fkey";

-- DropForeignKey
ALTER TABLE "LikedSong" DROP CONSTRAINT "LikedSong_userId_fkey";

-- DropForeignKey
ALTER TABLE "SongPlaylist" DROP CONSTRAINT "SongPlaylist_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "SongPlaylist" DROP CONSTRAINT "SongPlaylist_songId_fkey";

-- AlterTable
ALTER TABLE "AlbumGenre" DROP CONSTRAINT "AlbumGenre_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AlbumGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ArtistGenre" DROP CONSTRAINT "ArtistGenre_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ArtistGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LikedSong" DROP CONSTRAINT "LikedSong_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LikedSong_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SongPlaylist" DROP CONSTRAINT "SongPlaylist_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SongPlaylist_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumGenre_albumId_genreId_key" ON "AlbumGenre"("albumId", "genreId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistGenre_artistId_genreId_key" ON "ArtistGenre"("artistId", "genreId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedSong_userId_songId_key" ON "LikedSong"("userId", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "SongPlaylist_playlistId_songId_key" ON "SongPlaylist"("playlistId", "songId");

-- AddForeignKey
ALTER TABLE "SongPlaylist" ADD CONSTRAINT "SongPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongPlaylist" ADD CONSTRAINT "SongPlaylist_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedSong" ADD CONSTRAINT "LikedSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedSong" ADD CONSTRAINT "LikedSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGenre" ADD CONSTRAINT "ArtistGenre_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGenre" ADD CONSTRAINT "ArtistGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumGenre" ADD CONSTRAINT "AlbumGenre_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumGenre" ADD CONSTRAINT "AlbumGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
