import React, { useState, useEffect } from 'react';
import axios_to_gallery from './axios_to_gallery';
import axios_to_wp from './axios_to_wp';


function getGalleryID(wpID) {

    const [wpData, setWPData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios_to_wp.get(`/${wpID}`);
            setWPData(req.data);
        }
        fetchData();
    }, []);

    if (wpData.acf !== undefined && wpData.acf.db_gallery_id !== undefined) {
        console.log("There's a gallery id to fetch.\n");
        return wpData.acf.db_gallery_id;
    } else {
        console.log("There's no gallery id to fetch.\n");
        return -1;
    }

}

function getGalleryInformation(wpID) {
    const galleryID = getGalleryID(wpID);
    
    if (galleryID < 0) { // if article is not supposed to be a gallery
        return null;
    }
    console.log(galleryID);

    return;
    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios_to_gallery.get(`/gallery/:${galleryID}`);
            setGalleryData(req.data);
        }
        fetchData();
    }, []);

    return galleryData;


}

function PGallery(props) {
    getGalleryInformation(394726);

    return (
        <div>

        </div>
    )
}


export default PGallery


