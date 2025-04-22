import React from 'react';

interface MediaCardProps {
  title: string;
  subtitle?: string;
  cover: string;
  onClick?: () => void;
  actionIcon?: React.ReactNode;
}

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  subtitle,
  cover,
  onClick,
  actionIcon = (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"></path>
    </svg>
  ),
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#252525] hover:-translate-y-2 shadow-lg hover:shadow-xl h-full">
      <div className="relative">
        <img
          src={cover}
          alt={title}
          className="w-full aspect-square object-cover transition-all duration-300 group-hover:brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onClick}
            className="bg-[#D97706] text-white p-3 rounded-full hover:bg-[#B45309] transition-colors duration-150"
          >
            {actionIcon}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white text-sm font-medium truncate">{title}</h3>
        {subtitle && <p className="text-gray-400 text-xs truncate">{subtitle}</p>}
      </div>
    </div>
  );
};

export default MediaCard; 