import React, { useState, useEffect } from 'react';
import axios_to_gallery from './axios_to_gallery';
import axios_to_wp from './axios_to_wp';


function getGalleryID(wpID) {

    const [wpData, setWPData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const req = await axios_to_wp.get(`/${wpID}`);
                setWPData(req.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [wpID]);

    if (wpData.acf !== undefined && wpData.acf.db_gallery_id !== undefined) {
        console.log("There's a gallery id to fetch.\n");
        return wpData.acf.db_gallery_id;
    } else {
        console.log("There's no gallery id to fetch.\n");
        return -1;
    }

}

function getGalleryMetadata(wpID) {
    let galleryID = getGalleryID(wpID);
    galleryID = 1; // testing
    if (galleryID < 0) { // if article is not supposed to be a gallery
        return null;
    }
    console.log("getGalleryMetaData sees galleryID of ", galleryID);


    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const req = await axios_to_gallery.get(`/${galleryID}`)
                setGalleryData(req.data);
            } catch (e) {
                console.log(e);
            }

        }
        fetchData();
    }, [galleryID]);

    return galleryData;


}



export default getGalleryMetadata;


