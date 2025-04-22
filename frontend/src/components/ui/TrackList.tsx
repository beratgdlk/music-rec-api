import React from 'react';
import { motion } from 'framer-motion';
import { Track } from '../../types';

interface TrackListProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onLike?: (trackId: number | string) => void;
  likedTracks?: (number | string)[];
  currentPlayingId?: number | string | null;
  isPlaying?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onPlay,
  onLike,
  likedTracks = [],
  currentPlayingId = null,
  isPlaying = false,
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
      <div className="p-3 text-gray-400 text-xs grid grid-cols-12 gap-4">
        <div className="col-span-6">BAŞLIK</div>
        <div className="col-span-4">ALBÜM</div>
        <div className="col-span-2 text-right">SÜRE</div>
      </div>
      <div className="divide-y divide-[#333333]">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-12 gap-4 p-3 hover:bg-[#252525] group transition-colors"
          >
            <div className="col-span-6 flex items-center gap-3">
              <div className="relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <button
                  onClick={() => onPlay(track)}
                  className={`absolute inset-0 flex items-center justify-center ${
                    isPlaying && currentPlayingId === track.id
                      ? 'opacity-100 bg-black/50'
                      : 'opacity-0 bg-black/30 group-hover:opacity-100'
                  } transition-opacity`}
                >
                  {isPlaying && currentPlayingId === track.id ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium">{track.title}</h3>
                <p className="text-gray-400 text-xs">{track.artist}</p>
              </div>
            </div>
            <div className="col-span-4 flex items-center text-gray-400 text-sm">
              {track.album}
            </div>
            <div className="col-span-2 flex items-center justify-end gap-4">
              {onLike && (
                <button
                  onClick={() => onLike(track.id)}
                  className={`${
                    likedTracks.includes(track.id)
                      ? 'text-[#D97706]'
                      : 'text-gray-400 opacity-0 group-hover:opacity-100'
                  } transition-opacity`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={likedTracks.includes(track.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
              )}
              <span className="text-gray-400 text-sm">{track.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrackList; 