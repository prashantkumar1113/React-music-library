import "./App.css";
import {useState, useEffect, useRef, Fragment} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import ArtistView from "./components/ArtistView";
import AlbumView from "./components/AlbumView";
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
            {message}
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Fragment>
                                <SearchContext.Provider
                                    value={{
                                        term: searchInput,
                                        handleSearch: handleSearch,
                                    }}
                                >
                                    <SearchBar handleSearch={handleSearch} />
                                </SearchContext.Provider>
                                <DataContext.Provider value={data}>
                                    <Gallery />
                                    {/* <ArtistView />
                                    <AlbumView /> */}
                                </DataContext.Provider>
                            </Fragment>
                        }
                    />
                    <Route path="/album/:id" element={<AlbumView />} />
                    <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
