import { Song as PrismaSong, Rating, Review } from "@prisma/client";

// Track data including relationships
export interface TrackData extends PrismaSong {
  artist?: {
    id: number;
    name: string;
  };
  album?: {
    id: number;
    title: string;
    coverImage?: string;
  };
}

// Track with full details
export interface TrackWithDetails extends TrackData {
  reviews?: Review[];
  ratings?: Rating[];
  isLiked?: boolean;
}

// Track query parameters
export interface TrackQueryParams {
  limit?: number;
  offset?: number;
  search?: string;
  artistId?: number;
  albumId?: number;
  sort?: "title" | "releaseDate" | "rating";
  order?: "asc" | "desc";
}

// Track review input
export interface TrackReviewInput {
  content: string;
  trackId: number;
}
