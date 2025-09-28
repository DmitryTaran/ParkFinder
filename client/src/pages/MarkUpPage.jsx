import React from 'react';
import Canvas from "../components/Canvas/Canvas.jsx";
import PolygonsList from "../components/PolygonsList/PolygonsList.jsx";

const MarkUpPage = () => {

    return (
        <div className='page-wrapper'>
            <Canvas/>
            <PolygonsList/>
        </div>
    );
};

export default MarkUpPage;