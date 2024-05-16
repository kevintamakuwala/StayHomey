import React from 'react'
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import "./Shimmer.css"
const Shimmer = () => {
    return (
        <div className="shimmer-laptop">
            <ShimmerSimpleGallery className="shimmer" card imageHeight={200} row={1} col={2} caption />
            <ShimmerSimpleGallery className="shimmer" card imageHeight={200} row={1} col={2} caption />
            <ShimmerSimpleGallery className="shimmer" card imageHeight={200} row={1} col={2} caption />
            <ShimmerSimpleGallery className="shimmer" card imageHeight={200} row={1} col={2} caption />
        </div>
    );
};


export default Shimmer