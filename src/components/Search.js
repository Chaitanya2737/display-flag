import React, { useState, useEffect } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Create a debounced version of the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Reduced debounce time for better UX

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div>
      <input onChange={handleChange} type="text" value={search} placeholder="Search countries..." />
    </div>
  );
};

export default Search;
