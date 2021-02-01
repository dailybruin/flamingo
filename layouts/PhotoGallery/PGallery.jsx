import React, { useState, useEffect } from 'react';
import axios_to_gallery from './axios_to_gallery';
import axios_to_wp from './axios_to_wp';


function getGalleryID(wpID) {

    const [wpData, setWPData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const req = await axios_to_wp.get(`/${wpID}`);
                // console.log("wp response status:", req.status)
                setWPData(req.data);
            } catch (e) {
                console.log(e.response);
                console.log(e.response.data);
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

function getGalleryInformation(wpID) {
    var galleryID = getGalleryID(wpID);
    galleryID = 1; // testing
    if (galleryID < 0) { // if article is not supposed to be a gallery
        return null;
    }
    console.log(galleryID);


    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const req = await axios_to_gallery.get(`/${galleryID}`)
                console.log("gallery server response status", req.status);
                setGalleryData(req.data);
                return req;
            } catch (e) {
                console.log(e);
            }

        }
        fetchData();
    }, [galleryID]);

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


