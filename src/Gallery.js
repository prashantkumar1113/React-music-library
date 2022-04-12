import {useContext} from "react";
import {DataContext} from "./context/DataContext";
import GalleryItem from "./GalleryItem";

export default function Gallery() {
    const data = useContext(DataContext);
    // console.log(data);
    const display = data.map((item, index) => {
        return <GalleryItem item={item} key={index} />;
    });

    return <div>{display}</div>;
}
