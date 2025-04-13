import { Search } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Şarkı, sanatçı veya albüm ara...', className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 pl-12 pr-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-black font-medium px-4 py-1 rounded-full hover:bg-green-400 transition-colors"
      >
        Ara
      </button>
    </form>
  );
};

export default SearchBar; 