import { Playlist as PrismaPlaylist, Song } from '@prisma/client';

// Playlist data with relationships
export interface PlaylistData extends PrismaPlaylist {
  owner?: {
    id: number;
    username: string;
  };
  trackCount?: number;
}

// Playlist with full details including songs
export interface PlaylistWithSongs extends PlaylistData {
  songs?: (Song & {
    artist?: {
      id: number;
      name: string;
    };
  })[];
}

// Playlist creation input
export interface PlaylistCreateInput {
  name: string;
  description?: string;
  isPublic?: boolean;
  coverImage?: string;
}

// Playlist update input
export interface PlaylistUpdateInput {
  name?: string;
  description?: string;
  isPublic?: boolean;
  coverImage?: string;
}

// Add track to playlist input
export interface PlaylistAddTrackInput {
  trackId: number;
  playlistId: number;
  order?: number;
} 