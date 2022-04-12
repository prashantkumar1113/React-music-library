import "./App.css";
import {useState, useEffect, useRef} from "react";
import SearchBar from "./SearchBar";
import Gallery from "./Gallery";
import {DataContext} from "./context/DataContext";
import {SearchContext} from "./context/SearchContext";

function App() {
    let [search, setSearch] = useState("");
    let [message, setMessage] = useState("Search for Music!");
    let [data, setData] = useState([]);
    let searchInput = useRef("");

    const API_URL = "https://itunes.apple.com/search?term=";

    useEffect(() => {
        if (search) {
            const fetchData = async () => {
                document.title = `${search} Music`;
                const response = await fetch(API_URL + search);
                const resData = await response.json();
                // console.log(resData.results);

                if (resData.results.length > 0) {
                    setData(resData.results);
                } else {
                    setData("Not found");
                }
            };
            fetchData();
        }
    }, [search]);

    const handleSearch = (e, term) => {
        e.preventDefault();
        console.log(term);
        setSearch(term);
    };

    return (
        <div className="App">
            <SearchContext.Provider
                value={{term: searchInput, handleSearch: handleSearch}}
            >
                <SearchBar handleSearch={handleSearch} />
            </SearchContext.Provider>
            {message}
            <DataContext.Provider value={data}>
                <Gallery />
            </DataContext.Provider>
        </div>
    );
}

export default App;
