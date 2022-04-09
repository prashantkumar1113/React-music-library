import logo from "./logo.svg";
import "./App.css";
import {useState, useEffect} from "react";
import SearchBar from "./SearchBar";
import Gallery from "./Gallery";

function App() {
    let [search, setSearch] = useState("");
    let [message, setMessage] = useState("Search for Music!");
    let [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            document.title = `${search} Music`;
            const url =
                "https://itunes.apple.com/search?term=the%20grateful%20dead";
            const response = await fetch(url);
            const resData = await response.json();
            // console.log(resData);

            if (resData.results > 0) {
                setData(resData.results);
            } else {
                setData("Not found");
            }
        };
        fetchData();
    });

    return (
        <div className="App">
            <SearchBar />
            {message}
            <Gallery />
        </div>
    );
}

export default App;
