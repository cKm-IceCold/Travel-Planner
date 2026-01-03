const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="mb-4">
      <input 
       type="text" 
       placeholder="Search for destinations..." 
       value={searchTerm} 
       onChange={(e) => setSearchTerm(e.target.value)}
       className="w-full p-3 border rounded mb-6"
    />
    </div>
    );
};

export default SearchBar; 