const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Where do you want to go?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // Styled to look cleaner inside the container
        className="w-full p-4 outline-none text-slate-700 bg-transparent placeholder-slate-400"
      />
    </div>
  );
};

export default SearchBar; 