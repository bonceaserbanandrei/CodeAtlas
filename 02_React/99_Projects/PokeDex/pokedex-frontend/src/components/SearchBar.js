import '../styles/SearchBar.css';

export default function SearchBar({searchContent, inputChangeHandler}) {
    return (
        <input
          type="text"
          placeholder="Enter Pokémon ID or Name"
          value={searchContent}
          onChange={inputChangeHandler}
        />     
    );
}