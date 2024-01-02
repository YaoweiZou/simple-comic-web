import JSZip from "jszip";
import { useReducer, useState } from 'preact/hooks';
import './App.css';
import { IconDocBadgePlus } from "./components/icons/IconDocBadgePlus";
import { IconRectangleGrid } from "./components/icons/IconRectangleGrid";
import { IconWandAndStars } from "./components/icons/IconWandAndStars";
import reducer from "./reducer";

const initState = {
    readType: "RightToLeft",
    pageNumber: 0,
    isLoading: false,
}

export default function App() {
    const [imageUrls, setImageUrls] = useState([]);
    const [state, dispatch] = useReducer(reducer, initState);
    const { readType, pageNumber, isLoading } = state;

    const leftPageNumber = readType === "LeftToRight" ? pageNumber : pageNumber + 1;
    const rightPageNumber = readType === "LeftToRight" ? pageNumber + 1 : pageNumber;

    async function handleUpdateFile(event) {
        const files = event.target.files ?? [];
        if (files.length === 0) {
            return;
        }
        dispatch({ type: "SET_PAGE", payload: 0 });
        dispatch({ type: "ToggleLoadingState" });
        const jszip = new JSZip();
        try {
            const zip = await jszip.loadAsync(files[0]);
            const urls = await Promise.all(
                Object.keys(zip.files)
                    .filter(name => !zip.files[name].dir)
                    .map(async name => {
                        const item = zip.files[name];
                        const blob = await item.async('blob');
                        const imageUrl = URL.createObjectURL(blob);
                        return imageUrl;
                    })
            );
            setImageUrls(urls);
            dispatch({ type: "ToggleLoadingState" });
        } catch (error) {
            console.error(error);
        } finally {
            URL.revokeObjectURL(event.target.value);
        }
    }

    function handleWhell(e) {
        console.log(e);
    }

    function handleMatchPage() {
        dispatch({ type: "SET_PAGE", payload: pageNumber + 1 });
    }

    function handleChangePage(page) {
        if (page === "left" && state.readType === "RightToLeft") {
            dispatch({ type: "NEXT_PAGE" });
            return;
        }
        if (page === "right" && state.readType === "LeftToRight") {
            dispatch({ type: "NEXT_PAGE" });
            return;
        }
        dispatch({ type: "PREV_PAGE" });
    }

    return (
        <div className="app">
            <header className="header">
                <div className="left">
                    <div className="info">Simple Comic Web</div>
                    <label className="action-button" htmlFor="upload-file" title="打开文件">
                        <IconDocBadgePlus fill="#1d1d1f" fillOpacity="0.85" />
                        <input
                            id="upload-file"
                            className="upload-file"
                            type="file"
                            disabled={isLoading}
                            onChange={handleUpdateFile}
                            title="上传漫画文件"
                        />
                    </label>
                </div>
                <div className="right">
                    <button
                        className="action-button"
                        onClick={handleMatchPage}
                        title="调整跨页匹配，仅在双页面布局生效。"
                    >
                        <IconWandAndStars fill="#1d1d1f" fillOpacity="0.85" />
                    </button>
                    <button className="action-button" title="缩略视图">
                        <IconRectangleGrid fill="#1d1d1f" fillOpacity="0.85" />
                    </button>
                </div>
            </header>
            <main className="main" onWheel={handleWhell}>
                <div className="image-container">
                    <div className="image-wrapper left-image"
                        onClick={() => handleChangePage("left")}>
                        <img src={imageUrls[leftPageNumber]} alt="" />
                    </div>
                    <div className="image-wrapper right-image"
                        onClick={() => handleChangePage("right")}>
                        <img src={imageUrls[rightPageNumber]} alt="" />
                    </div>
                </div>
            </main>
        </div>
    );
}
